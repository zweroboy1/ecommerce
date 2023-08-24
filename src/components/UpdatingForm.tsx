import { PropsWithoutRef, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { registrationValidationSchema } from '../utils/registrationValidation';
import { Button } from './Button';
import { CustomerUpdating } from '../types';
import { UpdatingField } from './UpdatingField';

const UpdatingForm = observer(({ ...initialValues }: PropsWithoutRef<CustomerUpdating>) => {
  const [showedPage, setShowedPage] = useState('userInfo');

  const changePage = (namePage: string) => {
    if (showedPage !== namePage) {
      setShowedPage(namePage);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="button-wrapper">
        <Button className="button" type="button" onClick={() => changePage('userInfo')}>
          Персональные данные
        </Button>
        <Button className="button" type="button" onClick={() => changePage('address')}>
          Адреса
        </Button>
        {/* <Button className="button" type="button" onClick={() => changePage('personalData')}>
          Настройки профиля
        </Button> */}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={registrationValidationSchema}
      >
        {({ values, setFieldTouched, validateField }) => (
          <Form>
            {showedPage === 'userInfo' && (
              <div className="user-info">
                <h2>Личные данные</h2>

                <UpdatingField
                  label="Имя"
                  name="firstName"
                  placeholder="Введите имя"
                  type="text"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                />

                <UpdatingField
                  label="Фамилия"
                  name="lastName"
                  placeholder="Введите фамилию"
                  type="text"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                />

                <UpdatingField
                  label="Дата рождения"
                  name="dateOfBirth"
                  type="date"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                />
              </div>
            )}
            {showedPage === 'address' && (
              <>
                <div className="address-row">
                  <h2>Адреса доставки</h2>
                  <FieldArray
                    name="shippingAddresses"
                    render={() => (
                      <>
                        {values.shippingAddresses &&
                          values.shippingAddresses.length > 0 &&
                          values.shippingAddresses.map((address, index) => (
                            <div
                              className={`address ${
                                address.id === values.defaultShippingAddressId ? 'default' : ''
                              }`}
                              key={address.id}
                            >
                              {address.id === values.defaultShippingAddressId && (
                                <span>Адрес доставки по умолчанию</span>
                              )}
                              <UpdatingField
                                label="Страна"
                                name={`shippingAddresses.${index}.country`}
                                placeholder="Введите страну"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                              />
                              <UpdatingField
                                label="Город"
                                name={`shippingAddresses.${index}.city`}
                                placeholder="Введите город"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                              />
                              <UpdatingField
                                label="Улица"
                                name={`shippingAddresses.${index}.streetName`}
                                placeholder="Введите улицу"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                              />
                              <UpdatingField
                                label="Индекс"
                                name={`shippingAddresses.${index}.postalCode`}
                                placeholder="Введите индекс"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                              />
                            </div>
                          ))}
                      </>
                    )}
                  />
                  {values.shippingAddresses && values.shippingAddresses.length === 0 && (
                    <div>Пока ни одного адреса не указано</div>
                  )}
                </div>
                <div className="address-row">
                  <h2>Адреса оплаты</h2>
                  <FieldArray
                    name="billingAddresses"
                    render={() => (
                      <>
                        {values.billingAddresses &&
                          values.billingAddresses.length > 0 &&
                          values.billingAddresses.map((address, index) => {
                            return (
                              <div
                                className={`address ${
                                  address.id === values.defaultBillingAddressId ? 'default' : ''
                                }`}
                                key={address.id}
                              >
                                {address.id === values.defaultBillingAddressId && (
                                  <span>Адрес оплаты по умолчанию</span>
                                )}
                                <UpdatingField
                                  label="Страна"
                                  name={`billingAddresses.${index}.country`}
                                  placeholder="Введите страну"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                                <UpdatingField
                                  label="Город"
                                  name={`billingAddresses.${index}.city`}
                                  placeholder="Введите город"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                                <UpdatingField
                                  label="Улица"
                                  name={`billingAddresses.${index}.streetName`}
                                  placeholder="Введите улицу"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                                <UpdatingField
                                  label="Индекс"
                                  name={`billingAddresses.${index}.postalCode`}
                                  placeholder="Введите индекс"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                              </div>
                            );
                          })}
                      </>
                    )}
                  />
                  {values.billingAddresses && values.billingAddresses.length === 0 && (
                    <div>Пока ни одного адреса не указано</div>
                  )}
                </div>
                {values.addresses.length > 0 && (
                  <div className="address-row">
                    <h2>Другие адреса</h2>
                    <FieldArray
                      name="addresses"
                      render={() => (
                        <>
                          {values.addresses &&
                            values.addresses.length > 0 &&
                            values.addresses.map((address, index) => (
                              <div className="address" key={address.id}>
                                <UpdatingField
                                  label="Страна"
                                  name={`addresses.${index}.country`}
                                  placeholder="Введите страну"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                                <UpdatingField
                                  label="Город"
                                  name={`addresses.${index}.city`}
                                  placeholder="Введите город"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                                <UpdatingField
                                  label="Улица"
                                  name={`addresses.${index}.streetName`}
                                  placeholder="Введите улицу"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                                <UpdatingField
                                  label="Индекс"
                                  name={`addresses.${index}.postalCode`}
                                  placeholder="Введите индекс"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                />
                              </div>
                            ))}
                        </>
                      )}
                    />
                  </div>
                )}
              </>
            )}
            {showedPage === 'personalData' && (
              <div className="personal-data">
                <h2>Настройки профиля</h2>

                <UpdatingField
                  label="E-mail"
                  name="email"
                  placeholder="Введите e-mail"
                  type="email"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                />

                {/* <UpdatingField
                  label="Пароль"
                  name="password"
                  placeholder="Введите пароль"
                  type="password"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                /> */}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
});

export { UpdatingForm };
