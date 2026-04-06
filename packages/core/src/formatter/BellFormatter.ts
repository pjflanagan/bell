import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Token } from 'antlr4ts/Token';
import { BellLexer } from '../grammar/BellLexer';
import {
  BellParser,
  ProgramContext,
  SourceElementsContext,
  SourceElementContext,
  StatementContext,
  RequestBuildingStatementContext,
  CommandStatementContext,
  ImportStatementContext,
  ImportFromStatementContext,
  ImportNamedFromStatementContext,
  ImportAnonymousStatementContext,
  ParamKeyValueStatementContext,
  ParamVariableStatementContext,
} from '../grammar/BellParser';
import * as fs from 'fs';
import { formatExpr, formatString } from './formatExpr';

type ItemKind =
  | 'import' | 'export' | 'variable'
  | 'url' | 'path' | 'env' | 'require'
  | 'param' | 'header' | 'headers' | 'body'
  | 'method' | 'request-file'
  | 'log' | 'expect' | 'warn' | 'validate' | 'assert';

interface FormattedItem {
  kind: ItemKind;
  text: string;
  comments: string[];   // prepended to output before item.text
  paramKey?: string;
  paramValue?: string;
  headerKey?: string;
  headerValue?: string;
}

interface CommentToken {
  text: string;
  tokenIndex: number;
  line: number;
}

export function formatBellFile(filePath: string): string {
  const source = fs.readFileSync(filePath, 'utf8');
  return formatBellSource(source);
}

export function formatBellSource(source: string): string {
  const inputStream = CharStreams.fromString(source);
  const lexer = new BellLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new BellParser(tokenStream);
  const tree = parser.program();

  // Collect source elements and extract all comment tokens
  const sourceElements = gatherSourceElements(tree);
  const allComments = extractCommentTokens(tokenStream);

  const items = collectItems(tree, sourceElements, allComments);
  const orphanComments = collectOrphanComments(sourceElements, allComments);
  return assemble(items, orphanComments);
}

// ─── Comment extraction ──────────────────────────────────────────────────────

function extractCommentTokens(tokenStream: CommonTokenStream): CommentToken[] {
  // Access the internal token buffer (includes hidden-channel tokens)
  const allTokens: Token[] = (tokenStream as any).tokens ?? [];
  const result: CommentToken[] = [];
  for (const token of allTokens) {
    if (
      token.type === BellLexer.SingleLineComment ||
      token.type === BellLexer.MultiLineComment
    ) {
      result.push({
        text: normalizeComment(token.text ?? ''),
        tokenIndex: token.tokenIndex ?? 0,
        line: token.line,
      });
    }
  }
  return result;
}

function normalizeComment(raw: string): string {
  if (raw.startsWith('###')) {
    return raw.trim();
  }
  // Normalize to exactly one space after #
  const content = raw.replace(/^#\s*/, '').trimEnd();
  return content ? `# ${content}` : '#';
}

// Given a source element, return the comments that belong to it:
//   - Leading: comments between prev element's stop and this element's start
//   - Trailing (inline): comments within this element's token range,
//     on the same line as the element's stop token (moved to line above in output)
//
// Both are prepended to the statement in token-index order.
function commentsForElement(
  ctx: SourceElementContext,
  prevCtx: SourceElementContext | undefined,
  allComments: CommentToken[],
): string[] {
  const startIdx = ctx.start.tokenIndex;
  const stopIdx = ctx.stop?.tokenIndex ?? startIdx;
  const stopLine = ctx.stop?.line ?? ctx.start.line;
  const prevStopIdx = prevCtx?.stop?.tokenIndex ?? -1;

  const leading = allComments.filter(
    c => c.tokenIndex > prevStopIdx && c.tokenIndex < startIdx,
  );

  const trailing = allComments.filter(
    c => c.tokenIndex >= startIdx && c.tokenIndex <= stopIdx && c.line === stopLine,
  );

  // Token-index order: leading first (they're earlier), then trailing
  return [...leading, ...trailing].map(c => c.text);
}

// Comments that appear after the last source element (end-of-file comments)
function collectOrphanComments(
  sourceElements: SourceElementContext[],
  allComments: CommentToken[],
): string[] {
  if (sourceElements.length === 0) return allComments.map(c => c.text);
  const lastStop = sourceElements[sourceElements.length - 1].stop?.tokenIndex ?? 0;
  return allComments.filter(c => c.tokenIndex > lastStop).map(c => c.text);
}

// ─── Tree walking ────────────────────────────────────────────────────────────

function gatherSourceElements(program: ProgramContext): SourceElementContext[] {
  const elements: SourceElementContext[] = [];
  for (let i = 0; i < program.childCount; i++) {
    const child = program.getChild(i);
    if (child instanceof SourceElementsContext) {
      for (let j = 0; j < child.childCount; j++) {
        const se = child.getChild(j);
        if (se instanceof SourceElementContext) elements.push(se);
      }
    }
  }
  return elements;
}

function collectItems(
  program: ProgramContext,
  sourceElements: SourceElementContext[],
  allComments: CommentToken[],
): FormattedItem[] {
  const items: FormattedItem[] = [];
  for (let i = 0; i < sourceElements.length; i++) {
    const se = sourceElements[i];
    const item = formatStatement(se.statement());
    if (item) {
      item.comments = commentsForElement(se, sourceElements[i - 1], allComments);
      items.push(item);
    }
  }
  return items;
}

function formatStatement(stmt: StatementContext): FormattedItem | null {
  const vd = stmt.variableDeclaration();
  if (vd) {
    return {
      kind: 'variable',
      comments: [],
      text: `${vd.identifier().text} = ${formatExpr(vd.expression())}`,
    };
  }

  const rbs = stmt.requestBuildingStatement();
  if (rbs) return formatRequestBuilding(rbs);

  const rs = stmt.requestStatement();
  if (rs) {
    return { kind: 'method', comments: [], text: rs.text.trim().toUpperCase() };
  }

  const cmd = stmt.commandStatement();
  if (cmd) return formatCommand(cmd);

  const imp = stmt.importStatement();
  if (imp) return formatImport(imp);

  const vs = stmt.validateStatement();
  if (vs) {
    return {
      kind: 'validate',
      comments: [],
      text: `validate ${formatExpr(vs.expression())} as ${vs.identifier().text}`,
    };
  }

  const ws = stmt.warnStatement();
  if (ws) {
    const expr = formatExpr(ws.expression());
    const id = ws.identifier()?.text;
    return { kind: 'warn', comments: [], text: id ? `warn ${expr} as ${id}` : `warn ${expr}` };
  }

  const es = stmt.exportStatement();
  if (es) {
    const ids = es.identifier().map(id => id.text).join(', ');
    return { kind: 'export', comments: [], text: `export ${ids}` };
  }

  return null;
}

function formatRequestBuilding(rbs: RequestBuildingStatementContext): FormattedItem | null {
  const url = rbs.urlStatement();
  if (url) return { kind: 'url', comments: [], text: `url ${formatExpr(url.expression())}` };

  const path = rbs.pathStatement();
  if (path) return { kind: 'path', comments: [], text: `path ${formatExpr(path.expression())}` };

  const param = rbs.paramStatement();
  if (param) {
    if (param instanceof ParamVariableStatementContext) {
      const name = param.Identifier().text;
      return { kind: 'param', comments: [], text: `param ${name}` };
    }
    const kv = param as ParamKeyValueStatementContext;
    const key = formatExpr(kv.expression(0));
    const value = formatExpr(kv.expression(1));
    return { kind: 'param', comments: [], text: '', paramKey: key, paramValue: value };
  }

  const header = rbs.headerStatement();
  if (header) {
    const key = formatExpr(header.expression(0));
    const value = formatExpr(header.expression(1));
    return { kind: 'header', comments: [], text: '', headerKey: key, headerValue: value };
  }

  const headers = rbs.headersStatement();
  if (headers) return { kind: 'headers', comments: [], text: `headers ${formatExpr(headers.expression())}` };

  const body = rbs.bodyStatement();
  if (body) return { kind: 'body', comments: [], text: `body ${formatExpr(body.expression())}` };

  const require_ = rbs.requireStatement();
  if (require_) return { kind: 'require', comments: [], text: `require ${formatExpr(require_.expression())}` };

  const reqFile = rbs.requestStatementBuilding();
  if (reqFile) return { kind: 'request-file', comments: [], text: `request ${formatExpr(reqFile.expression())}` };

  const env = rbs.envStatement();
  if (env) {
    const exprs = env.expression();
    if (exprs.length === 0) return { kind: 'env', comments: [], text: 'env' };
    return { kind: 'env', comments: [], text: `env ${exprs.map(e => formatExpr(e)).join(' | ')}` };
  }

  return null;
}

function formatCommand(cmd: CommandStatementContext): FormattedItem | null {
  const log = cmd.logStatement();
  if (log) return { kind: 'log', comments: [], text: `log ${formatExpr(log.expression())}` };

  const assert_ = cmd.assertStatement();
  if (assert_) return { kind: 'assert', comments: [], text: `assert ${formatExpr(assert_.expression())}` };

  const expect = cmd.expectStatement();
  if (expect) return { kind: 'expect', comments: [], text: `expect ${formatExpr(expect.expression())}` };

  return null;
}

function formatImport(imp: ImportStatementContext): FormattedItem | null {
  if (imp instanceof ImportFromStatementContext) {
    return {
      kind: 'import',
      comments: [],
      text: `import ${imp.identifier().text} from ${formatString(imp.StringLiteral().text)}`,
    };
  }
  if (imp instanceof ImportNamedFromStatementContext) {
    const ids = imp.identifier().map(id => id.text).join(', ');
    return {
      kind: 'import',
      comments: [],
      text: `import { ${ids} } from ${formatString(imp.StringLiteral().text)}`,
    };
  }
  if (imp instanceof ImportAnonymousStatementContext) {
    return {
      kind: 'import',
      comments: [],
      text: `import ${formatString(imp.StringLiteral().text)}`,
    };
  }
  return null;
}

// ─── Assembly ────────────────────────────────────────────────────────────────

function assemble(items: FormattedItem[], orphanComments: string[]): string {
  const imports = items.filter(i => i.kind === 'import');
  const exports_ = items.filter(i => i.kind === 'export');
  const body = items.filter(i => i.kind !== 'import' && i.kind !== 'export');

  const processed = processGroups(body);

  const lines: string[] = [];

  for (const imp of imports) {
    imp.comments.forEach(c => lines.push(c));
    lines.push(imp.text);
  }
  if (imports.length > 0) lines.push('');

  let hadMethod = false;
  for (let i = 0; i < processed.length; i++) {
    const item = processed[i];

    // Blank line before url/path only when starting a second+ request block
    if ((item.kind === 'url' || item.kind === 'path') && hadMethod) {
      addBlankIfNeeded(lines);
    }

    item.comments.forEach(c => lines.push(c));
    lines.push(item.text);

    if (item.kind === 'method') {
      hadMethod = true;
      if (i < processed.length - 1) {
        addBlankIfNeeded(lines);
      }
    }
  }

  if (exports_.length > 0) {
    if (lines.length > 0 && lines[lines.length - 1] !== '') lines.push('');
    for (const exp of exports_) {
      exp.comments.forEach(c => lines.push(c));
      lines.push(exp.text);
    }
  }

  orphanComments.forEach(c => lines.push(c));

  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();

  return lines.join('\n') + '\n';
}

function addBlankIfNeeded(lines: string[]) {
  if (lines.length > 0 && lines[lines.length - 1] !== '') {
    lines.push('');
  }
}

// ─── Grouping passes ─────────────────────────────────────────────────────────

function processGroups(items: FormattedItem[]): FormattedItem[] {
  const result: FormattedItem[] = [];
  let i = 0;

  while (i < items.length) {
    const item = items[i];

    if (item.kind === 'param') {
      // Shorthand params (`param varName`) pass through as-is — no alignment
      if (!item.paramKey) {
        result.push(item);
        i++;
        continue;
      }
      // A comment or shorthand param within a key-value group breaks it
      const group: FormattedItem[] = [];
      while (i < items.length && items[i].kind === 'param' && items[i].paramKey && items[i].comments.length === 0) {
        group.push(items[i++]);
      }
      if (group.length > 0) {
        result.push(...alignParamTable(group));
      } else {
        // This param has a leading comment — flush it as a single-item group
        result.push(...alignParamTable([items[i++]]));
      }
      continue;
    }

    if (item.kind === 'header') {
      // A comment within a header group breaks it into separate groups
      const group: FormattedItem[] = [];
      while (i < items.length && items[i].kind === 'header' && items[i].comments.length === 0) {
        group.push(items[i++]);
      }
      if (group.length > 0) {
        result.push(...alignHeaderTable(group));
      } else {
        // This header has a leading comment — flush it as a single-item group
        result.push(...alignHeaderTable([items[i++]]));
      }
      continue;
    }

    result.push(item);
    i++;
  }

  return result;
}

function alignParamTable(group: FormattedItem[]): FormattedItem[] {
  const maxKeyLen = Math.max(...group.map(p => p.paramKey!.length));
  return group.map(p => ({
    kind: 'param' as ItemKind,
    comments: p.comments,
    text: `param ${p.paramKey!.padEnd(maxKeyLen)}  ${p.paramValue}`,
  }));
}

function alignHeaderTable(group: FormattedItem[]): FormattedItem[] {
  const maxKeyLen = Math.max(...group.map(h => h.headerKey!.length));
  return group.map(h => ({
    kind: 'header' as ItemKind,
    comments: h.comments,
    text: `header ${h.headerKey!.padEnd(maxKeyLen)}  ${h.headerValue}`,
  }));
}
