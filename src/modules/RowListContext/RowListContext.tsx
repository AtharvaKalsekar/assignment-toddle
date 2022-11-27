import { Node, NODE_MAP, NodeMap, ROWS } from 'models';
import { createContext, ReactNode, useContext } from 'react';

type TRowListContext = {
  rows: Node[];
  nodeMap: NodeMap;
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
  const value: TRowListContext = {
    rows: ROWS,
    nodeMap: NODE_MAP,
  };

  return (
    <RowListContext.Provider value={value}>{children}</RowListContext.Provider>
  );
};
