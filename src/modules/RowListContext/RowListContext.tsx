import { Node, ROWS } from 'models';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

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
        return rows[index].indentationLevel === 0;
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

      newRows[index] = {
        ...newRows[index],
        indentationLevel: newRows[index].indentationLevel + 1,
        parentId: index ? newRows[index - 1].parentId : 0,
      };

      for (let i = index + 1; i < rows.length; i++) {
        if (newRows[i].parentId === newRows[index].id) {
          newRows[i] = {
            ...newRows[i],
            indentationLevel: newRows[index].indentationLevel + 1,
          };
        }
      }

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
      newRows[index] = {
        ...newRows[index],
        indentationLevel: newRows[index].indentationLevel - 1,
        parentId: index ? newRows[index - 1].parentId : 0,
      };

      for (let i = index + 1; i < rows.length; i++) {
        if (newRows[i].parentId === newRows[index].id) {
          newRows[i] = {
            ...newRows[i],
            indentationLevel: newRows[index].indentationLevel - 1,
          };
        }
      }

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
