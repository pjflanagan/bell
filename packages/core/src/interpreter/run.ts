import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from '../grammar/BellLexer';
import { BellParser } from '../grammar/BellParser';
import { BellVisitor } from './BellVisitor';

export interface RunOptions {
  env?: string | null;
  visitor?: BellVisitor;
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
  const tree = parser.program();

  if (parser.numberOfSyntaxErrors > 0) {
    throw new SyntaxError(`Found ${parser.numberOfSyntaxErrors} syntax error(s).`);
  }

  const visitor = options.visitor ?? new BellVisitor(basePath, options.env ?? null);
  await visitor.visit(tree);
  return visitor;
}
