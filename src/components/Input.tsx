import { PropsWithoutRef } from 'react';
import { useField } from 'formik';
import { InputProps } from '../types';

const Input = ({
  label,
  className,
  defaultAddress,
  touch,
  valid,
  ...props
}: PropsWithoutRef<InputProps>) => {
  const [field, meta] = useField(props);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (defaultAddress && defaultAddress.checkDefaultAddress) {
      defaultAddress.setCheckDefaultAddress(false);
    }
    field.onChange(e);
    setTimeout(() => {
      if (touch) {
        touch.setFieldTouched?.(field.name, true);
      }
      if (valid) {
        valid.validateField?.(field.name);
      }
    }, 100);
    if (field.name === 'shippingAddressPostCode' || field.name === 'billingAddressPostCode') {
      if (defaultAddress && defaultAddress.setFieldTouched) {
        setTimeout(() => {
          defaultAddress.setFieldTouched?.(field.name, true);
        }, 100);
      }
    }
  };

  return (
    <label className={`label ${className || ''}${meta.touched && meta.error ? ' error' : ''}`}>
      <span>{label}</span>
      <input {...field} {...props} id={field.name} onChange={handleChange} />
      {meta.touched && meta.error ? <div className="error-message">{meta.error}</div> : null}
    </label>
  );
};

export { Input };
