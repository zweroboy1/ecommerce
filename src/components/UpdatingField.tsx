import { PropsWithoutRef, useState } from 'react';
import { useField } from 'formik';
import { InputProps } from '../types';
import { getCountryByCode } from '../utils/getCountryBuCode';

const UpdatingField = ({
  label,
  className,
  touch,
  valid,
  ...props
}: PropsWithoutRef<InputProps>) => {
  const [field, meta] = useField(props);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    setTimeout(() => {
      if (touch) {
        touch.setFieldTouched?.(field.name, true);
      }
      if (valid) {
        valid.validateField?.(field.name);
      }
    }, 100);
  };

  const value = field.name.includes('country') ? getCountryByCode(field.value) : field.value;

  return (
    <div className={`field ${className || ''}${meta.touched && meta.error ? ' error' : ''}`}>
      <span>{label}</span>
      <div className="field-wrapper">
        {isUpdate ? (
          <div className="input-wrapper">
            <input {...field} {...props} id={field.name} onChange={handleChange} />
            <button className="save-icon" onClick={() => setIsUpdate((prev) => prev)}>
              save
            </button>
          </div>
        ) : (
          <div className="text-wrapper">
            <span className="text">{value}</span>
            <button className="edit-icon" onClick={() => setIsUpdate((prev) => prev)}>
              edit
            </button>
          </div>
        )}
        {meta.touched && meta.error ? <div className="error-message">{meta.error}</div> : null}
      </div>
    </div>
  );
};

export { UpdatingField };
