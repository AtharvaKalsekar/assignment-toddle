import { DraggableItem } from '@components';

import { Row } from './Row';

export const RowList = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <DraggableItem
            handle={`#drag_handle_${index}`}
            axis="y"
            bounds="parent"
          >
            <div>
              <Row id={index} />
            </div>
          </DraggableItem>
        );
      })}
    </div>
  );
};
