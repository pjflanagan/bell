import { Token } from '../tokenizer/types';
import { ASTNode } from './ASTNode';

type Pointer<T> = T;

export class AbstractSyntaxTree {
  private root: ASTNode;
  private activeNode: Pointer<ASTNode>;

  constructor() {
    this.root = new ASTNode();
    this.activeNode = this.root;
  }

  getRoot(): ASTNode {
    return this.root;
  }

  getActiveNode(): ASTNode {
    return this.activeNode;
  }

  setActiveNode(node: ASTNode): void {
    this.activeNode = node;
  }

  addChildToActiveNode(token: Token): ASTNode {
    const newNode = new ASTNode(this.activeNode, token);
    this.activeNode.addChild(newNode);
    return newNode;
  }

  addSiblingToActiveNode(token: Token): ASTNode {
    const parent = this.activeNode.getParent();
    if (!parent) {
      throw new Error('Cannot add sibling to root node');
    }
    const newNode = new ASTNode(parent, token);
    parent.addChild(newNode);
    return newNode;
  }

  addParentToNode(token: Token): ASTNode {
    const currentParent = this.activeNode.getParent();
    if (!currentParent) {
      throw new Error('Cannot add parent to root node');
    }

    // create a new parent
    const newParent = new ASTNode(currentParent, token);
    // set the new parent as the child of the current parent
    currentParent.removeChild(this.activeNode);
    currentParent.addChild(newParent);
    // set the new parent as the parent of the active node
    this.activeNode.setParent(newParent);
    newParent.addChild(this.activeNode);


    this.activeNode = newParent;
    return newParent;
  }

  moveToParentNode(): void {
    const parent = this.activeNode.getParent();
    if (!parent) {
      throw new Error('Cannot move to parent of root node');
    }
    this.activeNode = parent;
  }

  moveToNextSibling(): void {
    const parent = this.activeNode.getParent();
    if (!parent) {
      throw new Error('Cannot move to next sibling of root node');
    }
    const children = parent.getChildren();
    this.activeNode = children[children.indexOf(this.activeNode) + 1];
  }

  moveToChildNode(index: number = 0): void {
    this.activeNode = this.activeNode.getChildren()[index];
  }

  public print(): void {
    const printNode = (node: ASTNode, indent: string) => {
      console.log(`${indent}${node.getValue()?.type}: ${node.getValue()?.value}`);
      for (const child of node.getChildren()) {
        printNode(child, indent + '  ');
      }
    };

    printNode(this.getRoot(), '');
  }
}
