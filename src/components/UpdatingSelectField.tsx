import { PropsWithoutRef, useState } from 'react';
import { Field, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { InputProps } from '../types';
import { getCountryByCode } from '../utils/getCountryBuCode';
import { Button } from './Button';
import { country } from '../constants/country';

const UpdatingSelectField = observer(
  ({
    label,
    className,
    touch,
    valid,
    isUpdateForm,
    setIsUpdateFields,
    refFieldName,
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
        if (refFieldName) {
          touch?.setFieldTouched?.(refFieldName, true);
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
              <Field {...field} {...props} as="select" onChange={handleChange}>
                {Object.keys(country).map((key, i) => (
                  <option key={key} value={country[key]} disabled={i === 0}>
                    {key}
                  </option>
                ))}
              </Field>

              {!field.name.includes('Address') && !field.name.includes('address') && (
                <Button className="save-icon" onClick={() => setIsUpdate((prev) => !prev)}>
                  save
                </Button>
              )}
              {!field.name.includes('Address') && !field.name.includes('address') && (
                <Button
                  className="cancel-icon"
                  onClick={() => {
                    if (setIsUpdateFields) {
                      setIsUpdateFields(field.name, false);
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
              {!field.name.includes('Address') && !field.name.includes('address') && (
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

export { UpdatingSelectField };
