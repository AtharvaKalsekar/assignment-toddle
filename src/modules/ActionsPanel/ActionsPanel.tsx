import './ActionsPanel.css';

import { IconButton } from '@components';
import { useRowListContext } from '@modules';
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
        <IconButton iconType="cancel" onClick={onClickCancelMove} />
      </div>
    );
  }

  return (
    <div className="container">
      <IconButton iconType="drag" onClick={onClickMove} />
      <IconButton
        iconType="left-arrow"
        onClick={onClickOutdent}
        disbaled={!canOutdent(index)}
      />
      <IconButton
        iconType="right-arrow"
        onClick={onClickIndent}
        disbaled={!canIndent(index)}
      />
      <IconButton iconType="delete" onClick={onClickDelete} />
    </div>
  );
};
