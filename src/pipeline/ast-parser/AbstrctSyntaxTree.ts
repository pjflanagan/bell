class AbstractSyntaxTree {
  private root: ASTNode | null;

  constructor() {
    this.root = null;
  }

  setRoot(node: ASTNode): void {
    this.root = node;
  }

  getRoot(): ASTNode | null {
    return this.root;
  }

  traverse(visitor: (node: ASTNode) => void): void {
    function visit(node: ASTNode | null) {
      if (node) {
        visitor(node);
        node.children.forEach(visit);
      }
    }
    visit(this.root);
  }
}

class ASTNode {
  public children: ASTNode[];
  public value: any;

  constructor(value: any) {
    this.value = value;
    this.children = [];
  }

  addChild(node: ASTNode): void {
    this.children.push(node);
  }
}

export { AbstractSyntaxTree, ASTNode };