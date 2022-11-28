import { ChangeEvent, KeyboardEventHandler, SyntheticEvent } from 'react';

type InputProps = {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onKeyDown?: (event: SyntheticEvent) => void;
};

export const Input = ({
  placeholder,
  onChange,
  value,
  onKeyDown,
}: InputProps) => {
  return (
    <input
      type={"text"}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></input>
  );
};
