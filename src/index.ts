import * as Parser from 'tree-sitter';
import u from 'unist-builder';
import { Node as UnistNode, Point as UnistPoint } from 'unist';

const pointToUninst = (
  treesitterPoint: Parser.Point,
  offset: number
): UnistPoint => {
  return {
    line: treesitterPoint.row + 1,
    column: treesitterPoint.column + 1,
    offset,
  };
};

export interface TreesitterOptions {
  onlyNamedChildren?: boolean;
}

/** Convert a tree-sitter tree to a unist tree */
export default (tree: Parser.Tree, options: TreesitterOptions): UnistNode => {
  const visitNode = (treesitterNode: Parser.SyntaxNode): UnistNode => {
    const treesitterChildren = options.onlyNamedChildren
      ? treesitterNode.namedChildren
      : treesitterNode.children;
    const children: UnistNode[] = treesitterChildren.map(x => visitNode(x));
    const props = {
      position: {
        start: pointToUninst(
          treesitterNode.startPosition,
          treesitterNode.startIndex
        ),
        end: pointToUninst(treesitterNode.endPosition, treesitterNode.endIndex),
      },
    };
    return children.length > 0
      ? u(treesitterNode.type, props, children)
      : u(treesitterNode.type, { ...props, value: treesitterNode.text });
  };

  return visitNode(tree.rootNode);
};
