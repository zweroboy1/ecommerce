import { PropsWithoutRef } from 'react';
import { useField } from 'formik';
import { InputProps } from '../types';

const Input = ({ label, className, ...props }: PropsWithoutRef<InputProps>) => {
  const [field, meta] = useField(props);

  return (
    <label className={`label ${className}`}>
      <span>{label}</span>
      <input {...field} {...props} id={field.name} />
      {meta.touched && meta.error ? <div className="error-message">{meta.error}</div> : null}
    </label>
  );
};

export { Input };
