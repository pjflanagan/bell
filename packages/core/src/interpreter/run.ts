import { CharStreams, CommonTokenStream, ANTLRErrorListener, Recognizer, Token } from 'antlr4ts';
import { BellLexer } from '../grammar/BellLexer';
import { BellParser } from '../grammar/BellParser';
import { BellVisitor } from './BellVisitor';

export interface RunOptions {
  env?: string | null;
  visitor?: BellVisitor;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

interface ParseError { line: number; col: number; msg: string; symbol: any; }

function improveMessage(err: ParseError, tokens: Token[]): string {
  if (!err.msg.includes("'='")) return err.msg;

  const first = tokens.find(t =>
    t.line === err.line &&
    t.channel === Token.DEFAULT_CHANNEL &&
    t.type === BellLexer.Identifier
  );
  if (!first?.text) return err.msg;

  if (/^[A-Z]+$/.test(first.text)) {
    return `Unrecognized HTTP method: "${first.text}". Known methods: ${HTTP_METHODS.join(', ')}`;
  }
  return `Unrecognized command: "${first.text}"`;
}

/**
 * Parse and execute Bell source code.
 * If `visitor` is provided it is reused (REPL use case); otherwise a fresh one is created.
 * Throws on syntax errors or runtime failures — caller decides how to handle them.
 */
export async function runSource(
  source: string,
  basePath: string,
  options: RunOptions = {},
): Promise<BellVisitor> {
  const inputStream = CharStreams.fromString(source);
  const lexer = new BellLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new BellParser(tokenStream);

  const errors: ParseError[] = [];
  const errorListener: ANTLRErrorListener<any> = {
    syntaxError(_rec: Recognizer<any, any>, symbol: any, line: number, col: number, msg: string) {
      errors.push({ line, col, msg, symbol });
    },
  };
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);
  parser.removeErrorListeners();
  parser.addErrorListener(errorListener);

  const tree = parser.program();

  if (errors.length > 0) {
    tokenStream.fill();
    const allTokens: Token[] = [];
    for (let i = 0; i < tokenStream.size; i++) allTokens.push(tokenStream.get(i));
    const first = errors[0];
    const message = improveMessage(first, allTokens);
    throw new SyntaxError(`Line ${first.line}: ${message}`);
  }

  const visitor = options.visitor ?? new BellVisitor(basePath, options.env ?? null);
  await visitor.visit(tree);
  return visitor;
}
