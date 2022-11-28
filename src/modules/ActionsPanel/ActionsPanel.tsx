import './ActionsPanel.css';

import { IconButton } from '@components';
import { useRowListContext } from 'modules/RowListContext';
import { useCallback } from 'react';

type ActionsPanelProps = {
  id: number;
  index: number;
};

export const ActionsPanel = ({ id, index }: ActionsPanelProps) => {
  const {
    canIndent,
    canOutdent,
    indentRow,
    outdentRow,
    deleteRow,
    startDndMode,
    endDndMode,
  } = useRowListContext();

  const onClickIndent = useCallback(() => {
    indentRow(index);
  }, [indentRow, index]);

  const onClickOutdent = useCallback(() => {
    outdentRow(index);
  }, [index, outdentRow]);

  const onClickDelete = useCallback(() => {
    deleteRow(index);
  }, [deleteRow, index]);

  const onClickMove = () => {
    startDndMode(index);
  };

  const onClickCancelMove = () => {
    endDndMode(index);
  };

  const { isDndMode } = useRowListContext();

  if (isDndMode) {
    return (
      <div className="container">
        <IconButton iconType="delete" onClick={onClickCancelMove} />
      </div>
    );
  }

  return (
    <div className="container">
      <IconButton
        id={`drag_handle_${id}`}
        iconType="drag"
        onClick={onClickMove}
      />
      {canOutdent(index) && (
        <IconButton iconType="left-arrow" onClick={onClickOutdent} />
      )}
      {canIndent(index) && (
        <IconButton iconType="right-arrow" onClick={onClickIndent} />
      )}
      <IconButton iconType="delete" onClick={onClickDelete} />
    </div>
  );
};
