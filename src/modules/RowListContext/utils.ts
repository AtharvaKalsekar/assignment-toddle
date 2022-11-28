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
    } else if (newIndentationLevel === previousNodeIndentationLevel) {
      newParentId = previousNodeParentId;
    } else if (newIndentationLevel < previousNodeIndentationLevel) {
      for (let i = startIndex - 1; i >= 0; i--) {
        if (newRows[i].indentationLevel === newIndentationLevel) {
          newParentId = newRows[i].parentId;
          break;
        }
      }
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

export const deleteAffectedRows = (newRows: Node[], startIndex: number) => {
  const affectedNodeIds: number[] = [newRows[startIndex].id];

  for (let i = startIndex + 1; i < newRows.length; i++) {
    if (affectedNodeIds.includes(newRows[i].parentId)) {
      affectedNodeIds.push(newRows[i].id);
    }
  }

  return newRows.filter((node) => !affectedNodeIds.includes(node.id));
};

export const getAffectedRowIndexes = (
  newRows: Node[],
  startIndex: number
): number[] => {
  const affectedNodeIds: number[] = [newRows[startIndex].id];
  const affectedNodeIndexes: number[] = [startIndex];

  for (let i = startIndex + 1; i < newRows.length; i++) {
    if (affectedNodeIds.includes(newRows[i].parentId)) {
      affectedNodeIds.push(newRows[i].id);
      affectedNodeIndexes.push(i);
    }
  }

  return affectedNodeIndexes;
};
