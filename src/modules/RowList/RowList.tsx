import { DraggableItem } from '@components';
import { useMemo, useRef } from 'react';

import { Row } from './Row';

export const RowList = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [gridHeight, gridWidth] = useMemo(() => {
    const height = ref.current?.offsetHeight || 0;
    const width = ref.current?.offsetWidth || 0;
    return [height, width];
  }, []);

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <DraggableItem
            handle={`#drag_handle_${index}`}
            axis="y"
            bounds="parent"
            grid={[gridWidth, gridHeight]}
            key={index}
            position={{ x: 0, y: gridHeight }}
          >
            <div ref={ref}>
              <Row id={index} />
            </div>
          </DraggableItem>
        );
      })}
    </div>
  );
};
