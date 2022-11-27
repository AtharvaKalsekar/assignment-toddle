import './EditableLabel.css';

import { Input } from '@components';
import { useClickOutside } from '@hooks';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

type EditableLabelProps = {
  indentationLevel: number;
  text: string;
};

export const EditableLabel = ({
  indentationLevel,
  text,
}: EditableLabelProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(
    text.length ? text : "Default text"
  );

  const ref = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setIsEditable(false);
  }, []);

  const { startListening } = useClickOutside(ref, onClickOutside);

  const onClick = useCallback(() => {
    setIsEditable(true);
    startListening();
  }, [startListening]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  }, []);

  return (
    <div ref={ref} onClick={onClick} className="editable-label-container">
      {Array.from({ length: indentationLevel }).map((_, index) => (
        <span> --- </span>
      ))}
      {isEditable ? (
        <Input
          value={inputText}
          placeholder="type something"
          onChange={onChange}
        ></Input>
      ) : (
        <div>{inputText}</div>
      )}
    </div>
  );
};
