import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from './grammar/BellLexer';
import { BellParser } from './grammar/BellParser';

// Create the lexer and parser
const inputStream = CharStreams.fromString("source code here");
const lexer = new BellLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new BellParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.compilationUnit();