import { PropsWithoutRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { registrationValidationSchema } from '../utils/registrationValidation';
import { Button } from './Button';
import { Input } from './Input';
import { RegisterUser, Credentials } from '../types';
import { country } from '../constants/country';
import { Context } from '../store/Context';
import { registerUser, getUser } from '../services/commercetoolsApi';
import { CT_EXISTING_CUSTOMER_ERROR } from '../constants/apiMessages';
import {
  USER_ALREADY_EXISTS,
  SOMETHING_WRONG,
  SUCCESS_REGISTRATION_MEGGAGE,
} from '../constants/errorMessages';

const RegistrationForm = observer(({ ...initialValues }: PropsWithoutRef<RegisterUser>) => {
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false);
  const [registrationInfo, setRegistrationInfo] = useState('');
  const history = useNavigate();
  const { user } = useContext(Context);

  const onSubmit = async (
    values: RegisterUser,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      await registerUser(values);
      setSubmitting(false);
      resetForm();
      setRegistrationInfo(SUCCESS_REGISTRATION_MEGGAGE);
      const credentials: Credentials = { email: values.email, password: values.password };

      setTimeout(async () => {
        try {
          const customerWithToken = await getUser(credentials);
          user?.setIsAuth(true);
          user?.setUser(customerWithToken);
          history('/');
        } catch (error) {
          setRegistrationInfo(SOMETHING_WRONG);
        }
      }, 3000);
    } catch (error) {
      if (error instanceof Error && error.message === CT_EXISTING_CUSTOMER_ERROR) {
        setRegistrationInfo(USER_ALREADY_EXISTS);
      } else {
        setRegistrationInfo(SOMETHING_WRONG);
      }
    }
  };

  const copyAddress = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: RegisterUser,
    setFieldValue: (
      field: keyof RegisterUser,
      value: string,
      shouldValidate?: boolean | undefined
    ) => void,
    setFieldTouched: (field: keyof RegisterUser, isTouched?: boolean | undefined) => void
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
            <Input label="Имя" name="firstName" placeholder="Введите имя" type="text" />

            <Input label="Фамилия" name="lastName" placeholder="Введите фамилию" type="text" />

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
                label="Улица"
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
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress, setFieldTouched }}
              />

              <label>
                <Field type="checkbox" name="isShippingAddressDefault" />
                Сделать адресом доставки по умолчанию
              </label>
            </div>

            <div className="address-row">
              <h2>Адрес оплаты</h2>

              <label>
                <input
                  type="checkbox"
                  onChange={async (e) => {
                    copyAddress(e, values, setFieldValue, setFieldTouched);
                  }}
                  checked={checkDefaultAddress}
                />
                <span>Скопировать данные из адреса доставки</span>
              </label>

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
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress, setFieldTouched }}
              />

              <label>
                <Field type="checkbox" name="isBillingAddressDefault" />
                Сделать адресом оплаты по умолчанию
              </label>
            </div>

            <Button className="button button-second" type="submit" disabled={!isValid}>
              {isSubmitting ? 'Submitting...' : 'Регистрация'}
            </Button>

            {registrationInfo !== '' && <div className="service__error">{registrationInfo}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
});

export { RegistrationForm };
