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
  // const [inputText, setInputText] = useState<string>(
  //   text.length ? text : "Default text"
  // );

  const ref = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setIsEditable(false);
  }, []);

  const { startListening } = useClickOutside(ref, onClickOutside);

  const onClick = useCallback(() => {
    setIsEditable(true);
    startListening();
  }, [startListening]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeText(index, event.target.value);
    },
    [index, onChangeText]
  );

  return (
    <div ref={ref} onClick={onClick} className="editable-label-container">
      {Array.from({ length: indentationLevel }).map((_, index) => (
        <span key={index}> --- </span>
      ))}
      {isEditable ? (
        <Input
          value={text}
          placeholder="type something"
          onChange={onChange}
        ></Input>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};
