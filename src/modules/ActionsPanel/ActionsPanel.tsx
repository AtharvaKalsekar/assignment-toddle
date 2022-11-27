import './ActionsPanel.css';

import { IconButton } from '@components';

type ActionsPanelProps = {
  id: string | number;
};

export const ActionsPanel = ({ id }: ActionsPanelProps) => {
  return (
    <div className="container">
      <IconButton id={`drag_handle_${id}`} iconType="drag" />
      <IconButton iconType="left-arrow" />
      <IconButton iconType="right-arrow" />
      <IconButton iconType="delete" />
    </div>
  );
};
