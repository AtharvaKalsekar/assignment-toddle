import './RowList.css';

import { Node } from 'models';
import { ActionsPanel } from 'modules/ActionsPanel';
import { EditableLabel } from 'modules/EditableLabel';

type RowProps = {
  node: Node;
  index: number;
};

export const Row = ({ node, index }: RowProps) => {
  return (
    <div className="row-container">
      <div className="actions-container">
        <ActionsPanel id={node.id} index={index} />
      </div>
      <div className="standard-container">
        <EditableLabel
          indentationLevel={node.indentationLevel}
          text={node.data.text}
        />
      </div>
    </div>
  );
};
