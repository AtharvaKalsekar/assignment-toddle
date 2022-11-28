import './RowList.css';

import { Node } from 'models';
import { ActionsPanel } from 'modules/ActionsPanel';
import { EditableLabel } from 'modules/EditableLabel';
import { useRowListContext } from 'modules/RowListContext';
import { useState } from 'react';

type RowProps = {
  node: Node;
  index: number;
};

export const Row = ({ node, index }: RowProps) => {
  const [showActions, setShowActions] = useState<boolean>(false);

  const { isDndMode } = useRowListContext();

  return (
    <div
      className="row-container"
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="actions-container">
        {showActions && <ActionsPanel id={node.id} index={index} />}
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
};
