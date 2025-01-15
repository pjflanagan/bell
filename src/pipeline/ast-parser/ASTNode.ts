import { Token } from "../tokenizer/types";

export class ASTNode {
  public children: ASTNode[];
  public value: Token | null;

  constructor(value: Token | null) {
    this.value = value;
    this.children = [];
  }

  addChild(node: ASTNode): void {
    this.children.push(node);
  }
}

export class CommandImport extends ASTNode {
  constructor(value: Token) {
    super(value);
  }
}