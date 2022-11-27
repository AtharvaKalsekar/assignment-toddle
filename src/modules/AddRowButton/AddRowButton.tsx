import { useRowListContext } from 'modules/RowListContext';

export const AddRowButton = () => {
  const { addRow } = useRowListContext();
  const onClick = () => {
    addRow();
  };

  return <button onClick={onClick}>AddRowButton</button>;
};
