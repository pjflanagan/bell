import { bellParser } from './ast-parser/bellParser';
import { read } from './read/read';
import { bellTokenizer } from './tokenizer/bellTokenizer';


export async function main() {
  const sourceCode = await read(`src/testBellFiles/0-comments-0-singleLine.bel`);
  const tokens = bellTokenizer.tokenize(sourceCode);
  bellParser.parse([...tokens]);
}