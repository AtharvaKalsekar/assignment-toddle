import { ChangeEvent } from 'react';

type InputProps = {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const Input = ({ placeholder, onChange, value }: InputProps) => {
  return (
    <input
      type={"text"}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};
