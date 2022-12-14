import { ReactNode } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';

type DraggableItemProps = Partial<Omit<DraggableProps, "children">> & {
  children: ReactNode;
};

export const DraggableItem = ({ children, ...rest }: DraggableItemProps) => {
  return <Draggable {...rest}>{children}</Draggable>;
};
