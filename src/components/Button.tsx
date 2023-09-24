import { PropsWithChildren } from 'react';
import { ButtonProps } from '../types';

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, className, disabled, type, onClick } = props;
  return (
    <button
      type={type || 'button'}
      className={`${className || ''} button`}
      disabled={disabled || false}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};

export { Button };
