import { Node, ROWS } from 'models';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { updateRows } from './utils';

type TRowListContext = {
  rows: Node[];
  indentRow: (index: number) => void;
  outdentRow: (index: number) => void;
  canIndent: (index: number) => boolean;
  canOutdent: (index: number) => boolean;
};

const RowListContext = createContext<TRowListContext | null>(null);

export const useRowListContext = () => {
  const ctx = useContext(RowListContext);
  if (!ctx) {
    throw new Error("Context unavailable");
  }
  return ctx;
};

type RowListContextProviderProps = {
  children: ReactNode;
};

export const RowListContextProvider = ({
  children,
}: RowListContextProviderProps) => {
  const [rows, setRows] = useState(ROWS);

  const canIndent = useCallback(
    (index: number) => {
      if (!index) {
        return false;
      }
      return (
        rows[index].indentationLevel - rows[index - 1].indentationLevel <= 0
      );
    },
    [rows]
  );

  const indentRow = useCallback(
    (index: number) => {
      const newRows = [...rows];

      //   const { indentationLevel } = newRows[index];
      //   const newIndentationLevel = indentationLevel + 1;

      //   let newParentId = 0;
      //   if (index > 0) {
      //     const {
      //       indentationLevel: previousNodeIndentationLevel,
      //       id: previousNodeId,
      //       parentId: previousNodeParentId,
      //     } = newRows[index - 1];
      //     newParentId = previousNodeId;
      //     if (newIndentationLevel === previousNodeIndentationLevel) {
      //       newParentId = previousNodeParentId;
      //     }
      //   }

      //   newRows[index] = {
      //     ...newRows[index],
      //     indentationLevel: newIndentationLevel,
      //     parentId: newParentId,
      //   };

      //   const affectedNodeIds: number[] = [newRows[index].id];

      //   for (let i = index + 1; i < rows.length; i++) {
      //     if (affectedNodeIds.includes(newRows[i].parentId)) {
      //       affectedNodeIds.push(newRows[i].id);
      //       newRows[i] = {
      //         ...newRows[i],
      //         indentationLevel: newRows[i].indentationLevel + 1,
      //       };
      //     }
      //   }

      updateRows(newRows, index, "indent");

      setRows(newRows);
    },
    [rows]
  );

  const canOutdent = useCallback((index: number) => {
    if (!index) {
      return false;
    }
    return true;
  }, []);

  const outdentRow = useCallback(
    (index: number) => {
      const newRows = [...rows];

      //   const { indentationLevel } = newRows[index];
      //   const newIndentationLevel = indentationLevel - 1;

      //   let newParentId = 0;
      //   if (index > 0) {
      //     const {
      //       indentationLevel: previousNodeIndentationLevel,
      //       id: previousNodeId,
      //       parentId: previousNodeParentId,
      //     } = newRows[index - 1];
      //     newParentId = previousNodeId;
      //     if (newIndentationLevel === previousNodeIndentationLevel) {
      //       newParentId = previousNodeParentId;
      //     }
      //   }

      //   newRows[index] = {
      //     ...newRows[index],
      //     indentationLevel: newIndentationLevel,
      //     parentId: newParentId,
      //   };

      //   const affectedNodeIds: number[] = [newRows[index].id];

      //   for (let i = index + 1; i < rows.length; i++) {
      //     if (affectedNodeIds.includes(newRows[i].parentId)) {
      //       affectedNodeIds.push(newRows[i].id);
      //       newRows[i] = {
      //         ...newRows[i],
      //         indentationLevel: newRows[i].indentationLevel - 1,
      //       };
      //     }
      //   }

      updateRows(newRows, index, "outdent");

      setRows(newRows);
    },
    [rows]
  );

  const value: TRowListContext = {
    rows,
    indentRow,
    outdentRow,
    canIndent,
    canOutdent,
  };

  return (
    <RowListContext.Provider value={value}>{children}</RowListContext.Provider>
  );
};
