import { ASTNode } from './ASTNode';

export class AbstractSyntaxTree {
  private root: ASTNode;

  constructor() {
    this.root = new ASTNode(null);
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
