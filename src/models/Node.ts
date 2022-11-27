import { STANDARD, Standard } from './Standard';

export type Node = {
  id: number;
  parentId: number;
  indentationLevel: number;
  data: {
    text: string;
  };
};

export type NodeMap = {
  [indendtationLevel: number]: Node[];
};

const flatten = (
  standard: Standard[] = [],
  indentationLevel: number = 0,
  parentId: number = 0
): Node[] => {
  const flatList: Node[] = [];

  const currentStandard = standard.shift();

  if (!currentStandard) {
    return [];
  }

  const node: Node = {
    id: currentStandard.id,
    parentId,
    indentationLevel,
    data: {
      text: currentStandard.text,
    },
  };
  flatList.push(node);

  return [
    ...flatList,
    ...flatten(
      currentStandard.subStandard,
      indentationLevel + 1,
      currentStandard.id
    ),
    ...flatten(standard, indentationLevel, parentId),
  ];
};

export const ROWS: Node[] = flatten(STANDARD);
