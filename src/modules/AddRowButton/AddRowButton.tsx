import './AddButton.css';

import { useRowListContext } from 'modules/RowListContext';
import { PlusCircle } from 'react-feather';

export const AddRowButton = () => {
  const { addRow } = useRowListContext();
  const onClick = () => {
    addRow();
  };

  return (
    <button className="add-button" onClick={onClick}>
      <div className="add-button-inner">
        <PlusCircle className="add-button-icon" width={15} height={15} />
        <span>Add a Row</span>
      </div>
    </button>
  );
};
