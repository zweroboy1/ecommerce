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
    initValue,
    setIsChangeFields,
    setFieldValue,
    isChangeField,
    onSave,
    setValid,
    ...props
  }: PropsWithoutRef<InputProps>) => {
    const [field, meta] = useField(props);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      if (initValue && initValue !== e.target.value && setIsChangeFields) {
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

    const value = field.name.includes('country') ? getCountryByCode(field.value) : field.value;

    return (
      <div className={`field ${className || ''}${meta.touched && meta.error ? ' error' : ''}`}>
        <span>{label}</span>
        <div className="field-wrapper">
          {isUpdateForm ? (
            <div className="input-wrapper">
              <input {...field} {...props} id={field.name} onChange={handleChange} />
              {!field.name.includes('Address') && (
                <Button
                  className="save-icon"
                  onClick={() => {
                    if (onSave) onSave();
                  }}
                  disabled={!isChangeField || !!meta.error}
                >
                  save
                </Button>
              )}
              {!field.name.includes('Address') && (
                <Button
                  className="save-icon"
                  onClick={() => {
                    if (setIsUpdateFields) {
                      setIsUpdateFields(field.name, false);
                      setIsChangeFields?.(field.name, false);
                      if (initValue) setFieldValue?.(field.name, initValue);
                    } else if (isUpdate) {
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
                    } else if (isUpdate) {
                      setIsUpdate(false);
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
