import { Node, ROWS } from 'models';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { deleteAffectedRows, updateRows } from './utils';

type TRowListContext = {
  rows: Node[];
  indentRow: (index: number) => void;
  outdentRow: (index: number) => void;
  canIndent: (index: number) => boolean;
  canOutdent: (index: number) => boolean;
  onChangeText: (index: number, text: string) => void;
  deleteRow: (index: number) => void;
  addRow: () => void;
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
      updateRows(newRows, index, "outdent");
      setRows(newRows);
    },
    [rows]
  );

  const onChangeText = useCallback(
    (index: number, text: string) => {
      const newRows = [...rows];
      newRows[index].data.text = text;
      setRows(newRows);
    },
    [rows]
  );

  const deleteRow = useCallback(
    (index: number) => {
      let newRows = [...rows];
      newRows = deleteAffectedRows(newRows, index);
      setRows(newRows);
    },
    [rows]
  );

  const addRow = useCallback(() => {
    const newRows = [...rows];
    newRows.push({
      id: new Date().getTime(),
      indentationLevel: newRows[newRows.length - 1].indentationLevel,
      parentId: newRows[newRows.length - 1].parentId,
      data: {
        text: "default text",
      },
    });
    setRows(newRows);
  }, [rows]);

  const value: TRowListContext = {
    rows,
    indentRow,
    outdentRow,
    canIndent,
    canOutdent,
    onChangeText,
    deleteRow,
    addRow,
  };

  return (
    <RowListContext.Provider value={value}>{children}</RowListContext.Provider>
  );
};
