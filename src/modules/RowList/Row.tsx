import './RowList.css';

import { ActionsPanel } from 'modules/ActionsPanel';
import { EditableLabel } from 'modules/EditableLabel';

type RowProps = {
  id: string | number;
  indentationLevel: number;
};

export const Row = ({ id }: RowProps) => {
  return (
    <div className="row-container">
      <div className="actions-container">
        <ActionsPanel id={id} />
      </div>
      <div className="standard-container">
        <EditableLabel />
      </div>
    </div>
  );
};
