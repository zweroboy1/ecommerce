import { PropsWithoutRef } from 'react';
import { useField } from 'formik';
import { InputProps } from '../types';

const Input = ({ label, className, defaultAddress, ...props }: PropsWithoutRef<InputProps>) => {
  const [field, meta] = useField(props);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (defaultAddress && defaultAddress.checkDefaultAddress) {
      defaultAddress.setCheckDefaultAddress(false);
    }
    field.onChange(e);
  };

  return (
    <label className={`label ${className}`}>
      <span>{label}</span>
      <input {...field} {...props} id={field.name} onChange={handleChange} />
      {meta.touched && meta.error ? <div className="error-message">{meta.error}</div> : null}
    </label>
  );
};

export { Input };
