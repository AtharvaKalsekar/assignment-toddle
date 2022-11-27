import { useRowListContext } from 'modules/RowListContext';
import { useMemo, useRef } from 'react';

import { Row } from './Row';

export const RowList = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { rows } = useRowListContext();

  const [gridHeight, gridWidth] = useMemo(() => {
    const height = ref.current?.offsetHeight || 0;
    const width = ref.current?.offsetWidth || 0;
    return [height, width];
  }, []);

  console.log({ rows });

  return (
    <div>
      {rows.map((node, index) => {
        return (
          <div ref={ref} key={index}>
            <Row node={node} index={index} />
          </div>
        );
      })}
    </div>
  );
};
