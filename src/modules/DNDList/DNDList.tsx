import { Row } from 'modules/RowList/Row';
import { useRowListContext } from 'modules/RowListContext';
import { useMemo, useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export const DNDList = () => {
  const [items, setItems] = useState<any[]>(getItems(10));
  const { rows, isDndMode, dndGroup, endDndMode } = useRowListContext();

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log({ onDragEnd: result });

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    endDndMode(result.source.index, result.destination.index);

    // setItems(newItems);
  };

  console.log({ dndGroup });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {rows.map((node, index) =>
              isDndMode ? (
                <Draggable
                  key={node.id}
                  draggableId={`${node.id}`}
                  index={index}
                >
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => {
                    const shouldHide =
                      dndGroup?.affectedRowIndexes.includes(index) &&
                      index > dndGroup.targetIndex;

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          ),
                          display: shouldHide ? "none" : "block",
                        }}
                      >
                        {index === dndGroup?.targetIndex ? (
                          dndGroup.affectedRowIndexes.map((i) => (
                            <Row node={rows[i]} index={i} />
                          ))
                        ) : !dndGroup?.affectedRowIndexes.includes(index) ? (
                          <Row node={node} index={index} />
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  }}
                </Draggable>
              ) : (
                <div key={node.id}>
                  <Row node={node} index={index} />
                </div>
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
