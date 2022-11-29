import './RowList.css';

import { ActionsPanel, EditableLabel, useRowListContext } from '@modules';
import { Node } from 'models';
import { memo, useState } from 'react';

type RowProps = {
  node: Node;
  index: number;
};

export const Row = memo(({ node, index }: RowProps) => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const { isDndMode, dndGroup } = useRowListContext();

  return (
    <div
      className="row-container"
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="actions-container">
        {((!isDndMode && showActions) ||
          (isDndMode && dndGroup?.targetIndex === index)) && (
          <ActionsPanel id={node.id} index={index} />
        )}
      </div>
      <div className="standard-container">
        <EditableLabel
          indentationLevel={node.indentationLevel}
          text={node.data.text}
          index={index}
        />
      </div>
    </div>
  );
});
