import { Input } from '@components';
import { useClickOutside } from '@hooks';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

export const EditableLabel = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("click here to edit");

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
    <div ref={ref} onClick={onClick}>
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
