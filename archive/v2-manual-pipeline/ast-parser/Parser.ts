
// This is where we can have expected next tokens, example:
// param paramName paramValue
// param -> unquoted-string-literal -> (number-literal | string-literal | identifier)

import { Token } from "../tokenizer/types";
import { AbstractSyntaxTree } from "./AbstractSyntaxTree";
import { TokenRuleMap } from "./bellParser";

// the parser will validate that each line is formatted properly, then place the tokens into an AST

export class Parser {
  ruleMap: TokenRuleMap;
  ast: AbstractSyntaxTree;

  constructor(ruleMap: TokenRuleMap) {
    this.ruleMap = ruleMap;
  }

  public parse(tokens: Token[]): AbstractSyntaxTree {
    const ast = new AbstractSyntaxTree();
    for (const token of tokens) {
      console.log(token.type);
      console.log(token.value);
      const rule = this.ruleMap[token.type];
      if (!rule) {
        throw new Error(`No rule found for token type: ${token.type}`);
      }
      switch (rule) {
        case 'child':
          const newChildNode = ast.addChildToActiveNode(token);
          ast.setActiveNode(newChildNode);
          break;
        case 'sibling':
          const newSiblingNode = ast.addSiblingToActiveNode(token);
          ast.setActiveNode(newSiblingNode);
          break;
        case 'parent':
          const newParentNode = ast.addParentToNode(token);
          ast.setActiveNode(newParentNode);
          break;
        case 'return':
          ast.moveToParentNode();
          break;
        default:
          throw new Error(`Invalid rule: ${rule}`);
      }
    }
    return ast;
  }
}
