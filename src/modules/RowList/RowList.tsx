import './RowList.css';

import { Row } from 'modules/RowList/Row';
import { useRowListContext } from 'modules/RowListContext';
import { useEffect } from 'react';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
  isTarget: boolean = false,
  isAPossibleDestination: boolean = false
) => {
  if (!isTarget) {
    return isAPossibleDestination
      ? {
          borderBottom: "2px solid red",
          marginBottom: "14px",
          ...draggableStyle,
        }
      : {
          ...draggableStyle,
        };
  }

  return {
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  };
};

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

export const RowList = () => {
  const { rows, isDndMode, dndGroup, endDndMode } = useRowListContext();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDndMode) {
        endDndMode();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [endDndMode, isDndMode]);

  console.log({ rows });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    endDndMode(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className="row-list-container"
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
                            provided.draggableProps.style,
                            index === dndGroup?.targetIndex,
                            dndGroup?.possibleDestinationIndexes.includes(index)
                          ),
                          display: shouldHide ? "none" : "block",
                        }}
                        className="row-wrapper"
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
                <div key={node.id} className="row-wrapper">
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
