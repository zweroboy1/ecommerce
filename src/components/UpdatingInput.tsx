import { PropsWithoutRef } from 'react';
import { useField } from 'formik';
import { InputProps } from '../types';

const UpdatingInput = ({
  label,
  className,
  defaultAddress,
  touch,
  valid,
  initValue,
  setIsChangeFields,
  setFieldValue,
  setValid,
  isChangeField,
  ...props
}: PropsWithoutRef<InputProps>) => {
  const [field, meta] = useField(props);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    if (typeof initValue === 'string' && initValue !== e.target.value && setIsChangeFields) {
      setIsChangeFields(field.name, true);
    } else if (setIsChangeFields) {
      setIsChangeFields(field.name, false);
    }
    setTimeout(() => {
      if (touch) {
        touch.setFieldTouched?.(field.name, true);
      }
      if (valid) {
        valid.validateField?.(field.name);
      }
      if (setValid) {
        setValid(e.target.value);
      }
    }, 100);
  };

  return (
    <label className={`label ${className || ''}${meta.touched && meta.error ? ' error' : ''}`}>
      <span>{label}</span>
      <input {...field} {...props} id={field.name} onChange={handleChange} />
      {meta.touched && meta.error && isChangeField ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </label>
  );
};

export { UpdatingInput };
