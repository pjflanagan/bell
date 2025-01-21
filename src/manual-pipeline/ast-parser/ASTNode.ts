import { Token } from "../tokenizer/types";

export class ASTNode {
  private children: ASTNode[];
  private value: Token | undefined;
  private parent: ASTNode | undefined;

  constructor(parent?: ASTNode, value?: Token) {
    this.parent = parent;
    this.value = value;
    this.children = [];
  }

  addChild(node: ASTNode): void {
    this.children.push(node);
  }

  removeChild(node: ASTNode): void {
    this.children = this.children.filter(child => child !== node);
  }

  getChildren(): ASTNode[] {
    return this.children;
  }

  getParent() {
    return this.parent;
  }

  setParent(parent: ASTNode): void {
    this.parent = parent;
  }

  getValue(): Token | undefined {
    return this.value;
  }
}
