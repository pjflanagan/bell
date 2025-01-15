
// This is where we can have expected next tokens, example:
// param paramName paramValue
// param -> unquoted-string-literal -> (number-literal | string-literal | identifier)

import { Token } from "../tokenizer/types";
import { AbstractSyntaxTree, ASTNode } from "./AbstractSyntaxTree";

// the parser will validate that each line is formatted properly, then place the tokens into an AST

export class Parser {

  // TODO: take token rules (expected next token)
  constructor() {}

  public *parse(tokens: Token[]): Generator<ASTNode> {
    const tree = new AbstractSyntaxTree();
    for(let i = 0; i < tokens.length; ++i) {
      const token = tokens[i];
      const node = new ASTNode(token);
      yield node;
    };
  }
}
