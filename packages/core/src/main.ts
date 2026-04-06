import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from './grammar/BellLexer';
import { BellParser } from './grammar/BellParser';
import { BellVisitor } from './interpreter/BellVisitor';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
  const filePath = path.join(__dirname, '../../../examples/5-postWithValidateAndExpect/post.POST.bel');
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  
  // Create the lexer and parser
  const inputStream = CharStreams.fromString(sourceCode);
  const lexer = new BellLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new BellParser(tokenStream);

  // Parse the input
  const tree = parser.program();

  // Execute using Visitor
  const visitor = new BellVisitor(filePath);
  await visitor.visit(tree);
  
  console.log("Execution finished.");
}

run().catch(err => {
  console.error("Error during execution:");
  console.error(err);
});
