import { PropsWithoutRef, useState } from 'react';
import { useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { InputProps } from '../types';
import { getCountryByCode } from '../utils/getCountryBuCode';
import { Button } from './Button';

const UpdatingField = observer(
  ({
    label,
    className,
    touch,
    valid,
    isUpdateForm,
    setIsUpdateFields,
    ...props
  }: PropsWithoutRef<InputProps>) => {
    const [field, meta] = useField(props);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          {isUpdateForm ? (
            <div className="input-wrapper">
              <input {...field} {...props} id={field.name} onChange={handleChange} />
              {!field.name.includes('Address') && (
                <Button className="save-icon" onClick={() => setIsUpdate((prev) => !prev)}>
                  save
                </Button>
              )}
              {!field.name.includes('Address') && (
                <Button
                  className="save-icon"
                  onClick={() => {
                    if (setIsUpdateFields) {
                      setIsUpdateFields(field.name, false);
                    } else {
                      setIsUpdate(false);
                    }
                  }}
                >
                  cansel
                </Button>
              )}
            </div>
          ) : (
            <div className="text-wrapper">
              <span className="text">{value}</span>
              {!field.name.includes('Address') && (
                <Button
                  className="edit-icon"
                  onClick={() => {
                    if (setIsUpdateFields) {
                      setIsUpdateFields(field.name, true);
                    } else {
                      setIsUpdate(true);
                    }
                  }}
                >
                  edit
                </Button>
              )}
            </div>
          )}
          {meta.touched && meta.error ? <div className="error-message">{meta.error}</div> : null}
        </div>
      </div>
    );
  }
);

export { UpdatingField };