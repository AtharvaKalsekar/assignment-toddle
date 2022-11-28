import './EditableLabel.css';

import { Input } from '@components';
import { useClickOutside } from '@hooks';
import { useRowListContext } from 'modules/RowListContext';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

type EditableLabelProps = {
  index: number;
  indentationLevel: number;
  text: string;
};

export const EditableLabel = ({
  index,
  indentationLevel,
  text,
}: EditableLabelProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { onChangeText } = useRowListContext();

  const ref = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setIsEditable(false);
  }, []);

  const { startListening } = useClickOutside(ref, onClickOutside);
  const { isDndMode } = useRowListContext();

  const onClick = useCallback(() => {
    if (isDndMode) {
      return;
    }
    setIsEditable(true);
    startListening();
  }, [isDndMode, startListening]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeText(index, event.target.value);
    },
    [index, onChangeText]
  );

  return (
    <div ref={ref} onClick={onClick} className="editable-label-container">
      {Array.from({ length: indentationLevel }).map((_, index) => (
        <div key={index} className="indent"></div>
      ))}
      {isEditable ? (
        <Input
          value={text}
          placeholder="type something"
          onChange={onChange}
        ></Input>
      ) : (
        <div className={`indentation-level-${indentationLevel}`}>{text}</div>
      )}
    </div>
  );
};
