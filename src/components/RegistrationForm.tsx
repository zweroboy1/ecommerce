import { PropsWithoutRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { registrationValidationSchema } from '../utils/registrationValidation';
import { Button } from './Button';
import { Input } from './Input';
import { RegistrationFormProps } from '../types';
import { country } from '../constants/country';
import { Context } from '../store/Context';

const RegistrationForm = observer(
  ({ ...initialValues }: PropsWithoutRef<RegistrationFormProps>) => {
    const [checkDefaultAddress, setCheckDefaultAddress] = useState(false);
    const history = useNavigate();
    const { user } = useContext(Context);

    const onSubmit = async (
      values: RegistrationFormProps,
      {
        setSubmitting,
        resetForm,
      }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ) => {
      // eslint-disable-next-line no-console
      console.log(values);
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            setSubmitting(false);
            // eslint-disable-next-line no-console
            console.log('Registration success');
            resolve(true);
          }, 1000);
        });
        resetForm();
        user?.setIsAuth(true);
        history('/');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Something wrong');
      }
    };

    const setDefaultAddress = (
      e: React.ChangeEvent<HTMLInputElement>,
      values: RegistrationFormProps,
      setFieldValue: (
        field: keyof RegistrationFormProps,
        value: string,
        shouldValidate?: boolean | undefined
      ) => void,
      setFieldTouched: (field: keyof RegistrationFormProps, isTouched?: boolean | undefined) => void
    ) => {
      if (e.target.checked) {
        setCheckDefaultAddress(true);
        setFieldValue('billingAddressStreet', values.shippingAddressStreet, true);
        setFieldValue('billingAddressCity', values.shippingAddressCity, true);
        setFieldValue('billingAddressPostCode', values.shippingAddressPostCode, true);
        setFieldValue('billingAddressCountry', values.shippingAddressCountry, true);
        setTimeout(() => {
          setFieldTouched('billingAddressStreet', true);
          setFieldTouched('billingAddressCity', true);
          setFieldTouched('billingAddressPostCode', true);
          setFieldTouched('billingAddressCountry', true);
        }, 100);
      } else {
        setCheckDefaultAddress(false);
      }
    };

    return (
      <div className="form-wrapper">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={registrationValidationSchema}
        >
          {({ values, setFieldValue, setFieldTouched, isValid, isSubmitting, errors, touched }) => (
            <Form>
              <Input label="Имя" name="name" placeholder="Введите имя" type="text" />

              <Input label="Фамилия" name="surname" placeholder="Введите фамилию" type="text" />

              <Input label="E-mail" name="email" placeholder="Введите e-mail" type="email" />

              <Input label="Пароль" name="password" placeholder="Введите пароль" type="password" />

              <Input
                label="Дата рождения"
                name="dateOfBirth"
                placeholder="Введите дату рождения"
                type="date"
              />

              <div className="address-row">
                <h2>Адрес доставки</h2>
                <label>
                  <span>Сделать адресом по умолчанию</span>
                  <input
                    type="checkbox"
                    onChange={async (e) => {
                      setDefaultAddress(e, values, setFieldValue, setFieldTouched);
                    }}
                    checked={checkDefaultAddress}
                  />
                </label>

                <Input
                  label="Город"
                  name="shippingAddressCity"
                  placeholder="Введите город"
                  type="text"
                  defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
                />

                <label
                  className={`label ${
                    touched.shippingAddressCountry && errors.shippingAddressCountry ? 'error' : ''
                  }`}
                >
                  <span>Страна</span>
                  <Field name="shippingAddressCountry" as="select">
                    {Object.keys(country).map((key, i) => (
                      <option key={key} value={country[key]} disabled={i === 0}>
                        {key}
                      </option>
                    ))}
                  </Field>
                  {touched.shippingAddressCountry && errors.shippingAddressCountry && (
                    <div className="error-message">{errors.shippingAddressCountry}</div>
                  )}
                </label>

                <Input
                  label="Уилца"
                  name="shippingAddressStreet"
                  placeholder="Введите улицу"
                  type="text"
                  defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
                />

                <Input
                  label="Индекс"
                  name="shippingAddressPostCode"
                  placeholder="Введите индекс"
                  type="text"
                  defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
                />
              </div>

              <div className="address-row">
                <h2>Адрес оплаты</h2>

                <label
                  className={`label ${
                    touched.billingAddressCountry && errors.billingAddressCountry ? 'error' : ''
                  }`}
                >
                  <span>Страна</span>
                  <Field name="billingAddressCountry" as="select">
                    {Object.keys(country).map((key, i) => (
                      <option key={key} value={country[key]} disabled={i === 0}>
                        {key}
                      </option>
                    ))}
                  </Field>
                  {touched.billingAddressCountry && errors.billingAddressCountry && (
                    <div className="error-message">{errors.billingAddressCountry}</div>
                  )}
                </label>

                <Input
                  label="Город"
                  name="billingAddressCity"
                  placeholder="Введите город"
                  type="text"
                  defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
                />

                <Input
                  label="Улица"
                  name="billingAddressStreet"
                  placeholder="Введите улицу"
                  type="text"
                  defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
                />

                <Input
                  label="Индекс"
                  name="billingAddressPostCode"
                  placeholder="Введите индекс"
                  type="text"
                  defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
                />
              </div>

              <Button className="button button-second" type="submit" disabled={!isValid}>
                {isSubmitting ? 'Submitting...' : 'Регистрация'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

export { RegistrationForm };
