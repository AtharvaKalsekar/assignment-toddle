import './AddButton.css';

import { useRowListContext } from 'modules/RowListContext';

export const AddRowButton = () => {
  const { addRow } = useRowListContext();
  const onClick = () => {
    addRow();
  };

  return (
    <button className="add-button" onClick={onClick}>
      AddRowButton
    </button>
  );
};
