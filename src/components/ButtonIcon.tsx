import { PropsWithChildren } from 'react';
import { ButtonIconProps } from '../types';

const ButtonIcon = (props: PropsWithChildren<ButtonIconProps>) => {
  const { children, className, disabled, type, onClick } = props;
  return (
    <button
      type={type || 'button'}
      className={`${className || ''}`}
      tabIndex={0}
      disabled={disabled || false}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { ButtonIcon };
