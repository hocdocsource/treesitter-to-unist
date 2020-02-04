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

/** Convert a tree-sitter tree to a unist tree */
export default (tree: Parser.Tree): UnistNode => {
  const visitNode = (treesitterNode: Parser.SyntaxNode): UnistNode => {
    const children: UnistNode[] = treesitterNode.namedChildren.map(x =>
      visitNode(x)
    );
    const props = {
      value: treesitterNode.text,
      position: {
        start: pointToUninst(
          treesitterNode.startPosition,
          treesitterNode.startIndex
        ),
        end: pointToUninst(treesitterNode.endPosition, treesitterNode.endIndex),
      },
    };
    return u(treesitterNode.type, props, children);
  };

  return visitNode(tree.rootNode);
};
