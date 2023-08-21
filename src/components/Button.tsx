import { PropsWithChildren } from 'react';
import { ButtonProps } from '../types';

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, className, disabled, type } = props;
  return (
    <button
      type={type || 'button'}
      className={`${className || ''} button`}
      disabled={disabled || false}
    >
      <span>{children}</span>
    </button>
  );
};

export { Button };
