import { Node } from 'models';

export const updateRows = (
  newRows: Node[],
  startIndex: number,
  operation: "indent" | "outdent"
) => {
  const { indentationLevel } = newRows[startIndex];
  const newIndentationLevel =
    indentationLevel + (operation === "indent" ? 1 : -1);

  let newParentId = 0;
  if (startIndex > 0) {
    const {
      indentationLevel: previousNodeIndentationLevel,
      id: previousNodeId,
      parentId: previousNodeParentId,
    } = newRows[startIndex - 1];
    newParentId = previousNodeId;
    if (newIndentationLevel === 0) {
      newParentId = 0;
    } else if (newIndentationLevel <= previousNodeIndentationLevel) {
      newParentId = previousNodeParentId;
    }
  }

  newRows[startIndex] = {
    ...newRows[startIndex],
    indentationLevel: newIndentationLevel,
    parentId: newParentId,
  };

  const affectedNodeIds: number[] = [newRows[startIndex].id];

  for (let i = startIndex + 1; i < newRows.length; i++) {
    if (affectedNodeIds.includes(newRows[i].parentId)) {
      affectedNodeIds.push(newRows[i].id);
      newRows[i] = {
        ...newRows[i],
        indentationLevel:
          newRows[i].indentationLevel + (operation === "indent" ? 1 : -1),
      };
    }
  }
};
