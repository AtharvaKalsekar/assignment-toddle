import { Node } from './Node';

export type Standard = {
  id: number;
  text: string;
  subStandard?: Standard[];
};

export const STANDARD: Standard[] = [
  {
    id: 1,
    text: "Standard 1",
    subStandard: [
      {
        id: 2,
        text: "Standard 2",
      },
    ],
  },
  {
    id: 3,
    text: "Standard 3",
    subStandard: [
      {
        id: 4,
        text: "Standard 4",
        subStandard: [
          {
            id: 8,
            text: "Standard 8",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    text: "Standard 5",
    subStandard: [
      {
        id: 6,
        text: "Standard 6",
      },
      {
        id: 7,
        text: "Standard 8",
      },
    ],
  },
];

const unFlatten = (nodes: Node[] = [], isAdded: any = {}): Standard[] => {
  const unFlatList: Standard[] = [];

  //@ts-ignore
  window.nodes = window.nodes || nodes;

  let currentNode = nodes.shift();
  while (currentNode && isAdded[currentNode.id]) {
    currentNode = nodes.shift();
  }

  if (!currentNode) {
    return [];
  }

  //@ts-ignore
  const childNodes: Node[] = window.nodes.filter(
    //@ts-ignore
    (n) => n.parentId === currentNode?.id
  );

  unFlatList.push({
    id: currentNode.id,
    text: currentNode.data.text,
    subStandard: unFlatten(childNodes, isAdded),
  });
  isAdded[currentNode.id] = true;

  return [...unFlatList, ...unFlatten(nodes, isAdded)];
};

const unFlatten2 = (nodes: Node[] = []): Standard[] => {
  const unFlatList: Standard[] = [];

  const standardMap: { [key: number]: Standard } = {};

  nodes.forEach((node) => {
    if (!node.parentId) {
      standardMap[node.id] = {
        id: node.id,
        text: node.data.text,
      };

      unFlatList.push(standardMap[node.id]);
    } else {
      standardMap[node.parentId].subStandard =
        standardMap[node.parentId].subStandard || [];
      standardMap[node.parentId].subStandard?.push({
        id: node.id,
        text: node.data.text,
      });
    }
  });

  return unFlatList;
};
