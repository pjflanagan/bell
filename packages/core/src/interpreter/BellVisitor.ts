import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { BellParserVisitor } from '../grammar/BellParserVisitor';
import {
  BinaryExpressionContext,
  BodyStatementContext,
  BooleanLiteralExpressionContext,
  DecimalLiteralExpressionContext,
  ExpectStatementContext,
  HeaderStatementContext,
  HeadersStatementContext,
  IdentifierExpressionContext,
  LogStatementContext,
  MemberIndexExpressionContext,
  NullLiteralExpressionContext,
  ParamStatementContext,
  ProgramContext,
  RelativeUrlExpressionContext,
  FullUrlExpressionContext,
  RequestStatementContext,
  ResponseExpressionContext,
  SourceElementContext,
  SourceElementsContext,
  StringLiteralExpressionContext,
  UrlStatementContext,
  PathStatementContext,
  VariableDeclarationContext,
  ImportFromStatementContext,
  ImportNamedFromStatementContext,
  ImportAnonymousStatementContext,
  RequestStatementBuildingContext,
  EnvStatementContext,
  ValidateStatementContext,
  WarnStatementContext,
  InputCallExpressionContext,
  ObjectLiteralExpressionContext,
  ArrayLiteralExpressionContext,
  AdditiveExpressionContext,
  ArrayAccessExpressionContext,
  BellParser,
} from '../grammar/BellParser';
import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from '../grammar/BellLexer';
import chalk from 'chalk';
import * as inquirer from 'inquirer';

export class BellVisitor extends AbstractParseTreeVisitor<any> implements BellParserVisitor<any> {
  private variables: Map<string, any> = new Map();
  private requestConfig: any = {
    method: 'GET',
    url: '',
    params: {},
    headers: {},
    data: null,
  };
  private lastResponse: AxiosResponse | null = null;
  private responses: AxiosResponse[] = [];
  private currentFilePath: string;
  private environments: any = null;
  private selectedEnv: string | null = null;

  constructor(filePath: string, initialEnv: string | null = null) {
    super();
    this.currentFilePath = path.resolve(filePath);
    this.selectedEnv = initialEnv;
  }

  protected defaultResult() {
    return Promise.resolve(null);
  }

  private resolvePath(relative: string): string {
    return path.resolve(path.dirname(this.currentFilePath), relative);
  }

  private resolveInterpolation(str: string): string {
    return str.replace(/{([^}]+)}/g, (_, name) => {
      if (this.variables.has(name)) {
        return this.variables.get(name);
      }
      return `{${name}}`;
    });
  }

  private getBaseUrl(): string {
    if (this.selectedEnv && this.environments && this.environments[this.selectedEnv]) {
        const env = this.environments[this.selectedEnv];
        return env.url || env.domain || '';
    }
    return '';
  }

  async visitProgram(ctx: ProgramContext): Promise<void> {
    for (let i = 0; i < ctx.childCount; i++) {
        await this.visit(ctx.getChild(i));
    }
  }

  async visitSourceElements(ctx: SourceElementsContext): Promise<void> {
    for (let i = 0; i < ctx.childCount; i++) {
      await this.visit(ctx.getChild(i));
    }
  }

  async visitSourceElement(ctx: SourceElementContext): Promise<void> {
    await this.visit(ctx.statement());
  }

  async visitVariableDeclaration(ctx: VariableDeclarationContext): Promise<void> {
    const id = ctx.identifier().text;
    const value = await this.visit(ctx.expression());
    this.variables.set(id, value);
  }

  async visitUrlStatement(ctx: UrlStatementContext): Promise<void> {
    const val = await this.visit(ctx.expression());
    this.requestConfig.url = val;
  }

  async visitPathStatement(ctx: PathStatementContext): Promise<void> {
    const pathVal = await this.visit(ctx.expression());
    const baseUrl = this.getBaseUrl();
    
    let fullUrl = baseUrl;
    if (baseUrl && !baseUrl.endsWith('/') && !pathVal.startsWith('/')) {
        fullUrl += '/';
    }
    fullUrl += pathVal;
    
    if (!fullUrl.startsWith('http') && fullUrl !== '') {
        fullUrl = 'http://' + fullUrl;
    }
    
    this.requestConfig.url = fullUrl;
  }

  async visitParamStatement(ctx: ParamStatementContext): Promise<void> {
    const keyExpr = ctx.expression(0);
    const key = await this.visit(keyExpr);
    
    if (ctx.childCount === 2) {
        if (typeof key === 'string' && key.includes('=')) {
            const [k, v] = key.split('=');
            this.requestConfig.params[k] = v;
        } else {
            this.requestConfig.params[key] = this.variables.get(key);
        }
    } else {
        const valExpr = ctx.expression(1);
        const value = await this.visit(valExpr);
        this.requestConfig.params[key] = value;
    }
  }

  async visitHeaderStatement(ctx: HeaderStatementContext): Promise<void> {
    const key = await this.visit(ctx.expression(0));
    const value = await this.visit(ctx.expression(1));
    this.requestConfig.headers[key] = value;
  }

  async visitHeadersStatement(ctx: HeadersStatementContext): Promise<void> {
    const headers = await this.visit(ctx.expression());
    if (headers && typeof headers === 'object') {
        Object.assign(this.requestConfig.headers, headers);
    }
  }

  async visitBodyStatement(ctx: BodyStatementContext): Promise<void> {
    const body = await this.visit(ctx.expression());
    this.requestConfig.data = body;
  }

  async visitRequestStatement(ctx: RequestStatementContext): Promise<void> {
    this.requestConfig.method = ctx.text.trim().toUpperCase();
    console.log(chalk.cyan(`➤ [${this.requestConfig.method}] ${chalk.bold(this.requestConfig.url)}`));
    try {
      const response = await axios.request(this.requestConfig);
      this.lastResponse = response;
      this.responses.push(response);
      const statusColor = response.status >= 200 && response.status < 300 ? chalk.green : chalk.yellow;
      console.log(statusColor(`✔ ${response.status} ${response.statusText}`));
    } catch (error: any) {
      if (error.response) {
        this.lastResponse = error.response;
        this.responses.push(error.response);
        console.log(chalk.red(`✘ ${error.response.status} ${error.response.statusText}`));
      } else {
        console.error(chalk.bgRed(`Request failed:`), chalk.red(error.message));
        throw error;
      }
    }
  }

  async visitLogStatement(ctx: LogStatementContext): Promise<void> {
    const val = await this.visit(ctx.expression());
    console.log(chalk.gray('  log:'), val);
  }

  async visitExpectStatement(ctx: ExpectStatementContext): Promise<void> {
    const result = await this.visit(ctx.expression());
    if (result) {
      console.log(chalk.green(`  ✔ Expect Passed: ${chalk.bold(ctx.expression().text)}`));
    } else {
      console.log(chalk.red(`  ✘ Expect Failed: ${chalk.bold(ctx.expression().text)}`));
    }
  }

  async visitWarnStatement(ctx: WarnStatementContext): Promise<void> {
    const val = await this.visit(ctx.expression());
    console.log(chalk.yellow(`  ⚠ Warning: ${val}`));
  }

  async visitImportFromStatement(ctx: ImportFromStatementContext): Promise<void> {
    const id = ctx.identifier().text;
    const relPath = ctx.StringLiteral().text.slice(1, -1);
    const fullPath = this.resolvePath(relPath);

    if (fullPath.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        this.variables.set(id, JSON.parse(content));
    } else {
        this.variables.set(id, { __file: fullPath });
    }
  }

  async visitImportNamedFromStatement(ctx: ImportNamedFromStatementContext): Promise<void> {
    const relPath = ctx.StringLiteral().text.slice(1, -1);
    const fullPath = this.resolvePath(relPath);
    
    ctx.identifier().forEach(idCtx => {
        const id = idCtx.text;
        this.variables.set(id, { __type: id, __file: fullPath });
    });
  }

  async visitImportAnonymousStatement(ctx: ImportAnonymousStatementContext): Promise<void> {
    const relPath = ctx.StringLiteral().text.slice(1, -1);
    const fullPath = this.resolvePath(relPath);
    if (fullPath.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        this.environments = JSON.parse(content);
        console.log(chalk.gray(`  Loaded environments from: ${path.basename(fullPath)}`));
    }
  }

  async visitEnvStatement(ctx: EnvStatementContext): Promise<void> {
    if (this.selectedEnv) {
        console.log(chalk.gray(`  Using environment: ${chalk.bold(this.selectedEnv)}`));
        return;
    }

    const options: string[] = [];
    for (let i = 0; i < ctx.expression().length; i++) {
        options.push(await this.visit(ctx.expression(i)));
    }

    if (options.length === 1) {
        this.selectedEnv = options[0];
    } else if (options.length > 1) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'env',
                message: 'Select environment:',
                choices: options
            }
        ]);
        this.selectedEnv = answers.env;
    } else if (this.environments) {
        const envNames = Object.keys(this.environments);
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'env',
                message: 'Select environment:',
                choices: envNames
            }
        ]);
        this.selectedEnv = answers.env;
    }
    
    console.log(chalk.gray(`  Environment set to: ${chalk.bold(this.selectedEnv)}`));
  }

  async visitRequestStatementBuilding(ctx: RequestStatementBuildingContext): Promise<void> {
    const relPath = await this.visit(ctx.expression());
    const fullPath = this.resolvePath(relPath);
    
    console.log(chalk.gray(`  Loading request file: ${fullPath}`));
    const sourceCode = fs.readFileSync(fullPath, 'utf8');
    const inputStream = CharStreams.fromString(sourceCode);
    const lexer = new BellLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new BellParser(tokenStream);
    const tree = parser.program();

    const oldPath = this.currentFilePath;
    this.currentFilePath = fullPath;
    await this.visit(tree);
    this.currentFilePath = oldPath;
  }

  async visitValidateStatement(ctx: ValidateStatementContext): Promise<void> {
    const val = await this.visit(ctx.expression());
    const typeId = ctx.identifier().text;
    
    if (val === undefined || val === null) {
      console.log(chalk.red(`  ✘ Validation Failed: ${chalk.bold(ctx.expression().text)} as ${typeId}`));
    } else {
      console.log(chalk.green(`  ✔ Validation Passed: ${chalk.bold(ctx.expression().text)} as ${typeId}`));
    }
  }

  // Expressions

  async visitIdentifierExpression(ctx: IdentifierExpressionContext) {
    const id = ctx.identifier().text;
    if (this.variables.has(id)) {
        return this.variables.get(id);
    }
    if (id === 'url') return this.requestConfig.url;
    return id;
  }

  async visitStringLiteralExpression(ctx: StringLiteralExpressionContext) {
    const str = ctx.text;
    const content = str.substring(1, str.length - 1);
    return this.resolveInterpolation(content);
  }

  async visitDecimalLiteralExpression(ctx: DecimalLiteralExpressionContext) {
    return parseFloat(ctx.text);
  }

  async visitBooleanLiteralExpression(ctx: BooleanLiteralExpressionContext) {
    return ctx.text === 'true';
  }

  async visitNullLiteralExpression(ctx: NullLiteralExpressionContext) {
    return null;
  }

  async visitResponseExpression(ctx: ResponseExpressionContext) {
    return this.lastResponse;
  }

  async visitRelativeUrlExpression(ctx: RelativeUrlExpressionContext) {
    return ctx.text;
  }

  async visitFullUrlExpression(ctx: FullUrlExpressionContext) {
    return this.resolveInterpolation(ctx.text);
  }

  async visitInputCallExpression(ctx: InputCallExpressionContext) {
    let prompt = 'Input value:';
    const inputCall = ctx.inputCall();
    if (inputCall.expression()) {
        prompt = await this.visit(inputCall.expression()!);
    }
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'val',
            message: prompt
        }
    ]);
    return answers.val;
  }

  async visitObjectLiteralExpression(ctx: ObjectLiteralExpressionContext) {
    const obj: any = {};
    const objLiteral = ctx.objectLiteral();
    for (let i = 0; i < objLiteral.propertyAssignment().length; i++) {
        const propCtx = objLiteral.propertyAssignment(i);
        let key: string;
        if (propCtx.identifier()) {
            key = propCtx.identifier()!.text;
        } else {
            const str = propCtx.StringLiteral()!.text;
            key = str.substring(1, str.length - 1);
        }
        obj[key] = await this.visit(propCtx.expression());
    }
    return obj;
  }

  async visitArrayLiteralExpression(ctx: ArrayLiteralExpressionContext) {
    const arr: any[] = [];
    const arrayLit = ctx.arrayLiteral();
    for (let i = 0; i < arrayLit.expression().length; i++) {
        arr.push(await this.visit(arrayLit.expression(i)));
    }
    return arr;
  }

  async visitAdditiveExpression(ctx: AdditiveExpressionContext) {
    const left = await this.visit(ctx.expression(0));
    const right = await this.visit(ctx.expression(1));
    return left + right;
  }

  async visitArrayAccessExpression(ctx: ArrayAccessExpressionContext) {
    const target = await this.visit(ctx.expression(0));
    const index = await this.visit(ctx.expression(1));
    if (target === this.lastResponse && typeof index === 'number') {
        return this.responses[index];
    }
    if (target && typeof target === 'object' || Array.isArray(target)) {
        return target[index];
    }
    return undefined;
  }

  async visitMemberIndexExpression(ctx: MemberIndexExpressionContext) {
    const obj = await this.visit(ctx.expression());
    const prop = ctx.memberIdentifier().text;
    if (obj && typeof obj === 'object') {
        if (obj.data !== undefined && prop === 'body') return obj.data;
        if (obj.data !== undefined && obj.data[prop] !== undefined) return obj.data[prop];
        return obj[prop];
    }
    return undefined;
  }

  async visitMemberIdentifier(ctx: any) {
    return ctx.text;
  }

  async visitBinaryExpression(ctx: BinaryExpressionContext) {
    const left = await this.visit(ctx.expression(0));
    const right = await this.visit(ctx.expression(1));
    const op = ctx.getChild(1).text;

    switch (op) {
      case '==': return left == right;
      case '===': return left === right;
      case '!=': return left != right;
      case '!==': return left !== right;
      case '<': return left < right;
      case '>': return left > right;
      case '<=': return left <= right;
      case '>=': return left >= right;
      default: return false;
    }
  }

  async visit(tree: any): Promise<any> {
    return await super.visit(tree);
  }
}
