import './App.css';

import { DraggableItem } from '@components';
import { EditableLabel } from 'modules';

function App() {
  return (
    <div>
      <DraggableItem>
        <div>drag this element</div>
      </DraggableItem>
      <EditableLabel />
    </div>
  );
}

export default App;
