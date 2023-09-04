import { PropsWithoutRef } from 'react';
import { Field, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { InputProps } from '../types';
import { country } from '../constants/country';

const UpdatingSelectInput = observer(
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
        if (refFieldName) {
          touch?.setFieldTouched?.(refFieldName, true);
        }
      }, 100);
    };

    return (
      <div className={`field ${className || ''}${meta.touched && meta.error ? ' error' : ''}`}>
        <span>{label}</span>
        <div className="input-wrapper">
          <Field {...field} {...props} as="select" onChange={handleChange}>
            {Object.keys(country).map((key, i) => (
              <option key={key} value={country[key]} disabled={i === 0}>
                {key}
              </option>
            ))}
          </Field>
        </div>
        {meta.touched && meta.error ? <div className="error-message">{meta.error}</div> : null}
      </div>
    );
  }
);

export { UpdatingSelectInput };
