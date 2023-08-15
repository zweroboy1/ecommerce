import { PropsWithoutRef } from 'react';
import { InputProps } from '../types';

const Input = ({ placeholder, value, onChange, title, ...props }: PropsWithoutRef<InputProps>) => {
  return (
    <label className={props.className}>
      <span>{title}</span>
      <input type={props.type || 'text'} placeholder={placeholder} value={value} maxLength={props.maxLength || 30} />
    </label>
  );
};

export { Input };
