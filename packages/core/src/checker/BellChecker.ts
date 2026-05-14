import { CharStreams, CommonTokenStream, ANTLRErrorListener, Recognizer, Token } from 'antlr4ts';
import { BellLexer } from '../grammar/BellLexer';
import {
  BellParser,
  IdentifierExpressionContext,
  VariableDeclarationContext,
  ImportFromStatementContext,
  ImportNamedFromStatementContext,
  ExportStatementContext,
  ValidateStatementContext,
  ParamVariableStatementContext,
} from '../grammar/BellParser';

export interface BellDiagnostic {
  line: number;    // 1-based
  col: number;     // 0-based
  length: number;
  message: string;
  severity: 'error' | 'warning';
}

export function checkBellSource(source: string): BellDiagnostic[] {
  const diags: BellDiagnostic[] = [];

  const errorListener: ANTLRErrorListener<any> = {
    syntaxError(
      _recognizer: Recognizer<any, any>,
      offendingSymbol: any,
      line: number,
      charPositionInLine: number,
      msg: string,
    ): void {
      const text: string = offendingSymbol?.text ?? '';
      diags.push({
        line,
        col: charPositionInLine,
        length: text && text !== '<EOF>' ? text.length : 1,
        message: msg,
        severity: 'error',
      });
    },
  };

  const inputStream = CharStreams.fromString(source);
  const lexer = new BellLexer(inputStream);
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);

  const tokenStream = new CommonTokenStream(lexer);
  const parser = new BellParser(tokenStream);
  parser.removeErrorListeners();
  parser.addErrorListener(errorListener);

  const tree = parser.program();

  // Improve generic ANTLR "expecting '='" errors into actionable diagnostics
  tokenStream.fill();
  const allTokens: Token[] = [];
  for (let i = 0; i < tokenStream.size; i++) {
    allTokens.push(tokenStream.get(i));
  }
  for (let i = 0; i < diags.length; i++) {
    diags[i] = improveExpectingAssignError(diags[i], allTokens);
  }

  // Semantic analysis only when there are no syntax errors (avoids cascading noise)
  if (diags.length === 0) {
    // `response` and `url` are accessible as identifier expressions (built-in runtime values)
    const definedVars = new Set<string>(['url', 'response']);
    walkSemantics(tree, definedVars, diags);
  }

  return diags;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

function improveExpectingAssignError(diag: BellDiagnostic, tokens: Token[]): BellDiagnostic {
  if (!diag.message.includes("'='")) return diag;

  // Find the first non-whitespace, non-newline token on this line that is an Identifier
  const first = tokens.find(t =>
    t.line === diag.line &&
    t.channel === Token.DEFAULT_CHANNEL &&
    t.type === BellLexer.Identifier &&
    t.type !== Token.EOF
  );

  if (!first || !first.text) return diag;

  const name = first.text;

  // All-uppercase word that looks like an HTTP method attempt
  if (/^[A-Z]+$/.test(name)) {
    return {
      line: first.line,
      col: first.charPositionInLine,
      length: name.length,
      message: `Unrecognized HTTP method: "${name}". Known methods: ${HTTP_METHODS.join(', ')}`,
      severity: 'error',
    };
  }

  return {
    line: first.line,
    col: first.charPositionInLine,
    length: name.length,
    message: `Unrecognized command: "${name}"`,
    severity: 'error',
  };
}

function walkSemantics(node: any, vars: Set<string>, diags: BellDiagnostic[]): void {
  if (node instanceof VariableDeclarationContext) {
    // Evaluate RHS before defining, so `x = x + 1` flags `x` as undefined
    walkSemantics(node.expression(), vars, diags);
    vars.add(node.identifier().text);
    return;
  }

  if (node instanceof ImportFromStatementContext) {
    vars.add(node.identifier().text);
    return;
  }

  if (node instanceof ImportNamedFromStatementContext) {
    node.identifier().forEach((id: any) => vars.add(id.text));
    return;
  }

  if (node instanceof ExportStatementContext) {
    node.identifier().forEach((id: any) => {
      if (!vars.has(id.text)) {
        const token = id.start;
        diags.push({
          line: token.line,
          col: token.charPositionInLine,
          length: id.text.length,
          message: `Undefined variable: "${id.text}"`,
          severity: 'warning',
        });
      }
    });
    return;
  }

  if (node instanceof ValidateStatementContext) {
    walkSemantics(node.expression(), vars, diags);
    const typeId = node.identifier();
    if (!vars.has(typeId.text)) {
      const token = typeId.start;
      diags.push({
        line: token.line,
        col: token.charPositionInLine,
        length: typeId.text.length,
        message: `Undefined variable: "${typeId.text}"`,
        severity: 'warning',
      });
    }
    return;
  }

  if (node instanceof ParamVariableStatementContext) {
    const name = node.Identifier().text;
    if (!vars.has(name)) {
      const token = node.Identifier().symbol;
      diags.push({
        line: token.line,
        col: token.charPositionInLine,
        length: name.length,
        message: `Undefined variable: "${name}"`,
        severity: 'warning',
      });
    }
    return;
  }

  if (node instanceof IdentifierExpressionContext) {
    const name = node.identifier().text;
    if (!vars.has(name)) {
      const token = node.identifier().start;
      diags.push({
        line: token.line,
        col: token.charPositionInLine,
        length: name.length,
        message: `Undefined variable: "${name}"`,
        severity: 'warning',
      });
    }
    return;
  }

  // Recurse into all children
  if (node.childCount) {
    for (let i = 0; i < node.childCount; i++) {
      walkSemantics(node.getChild(i), vars, diags);
    }
  }
}
