import './App.css';

import { AddRowButton, RowList } from '@modules';
import { DNDList } from 'modules/DNDList/DNDList';

function App() {
  return (
    <div>
      <RowList />
      <AddRowButton />
      <DNDList />
    </div>
  );
}

export default App;
