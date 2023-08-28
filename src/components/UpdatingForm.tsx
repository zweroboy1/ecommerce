import { PropsWithoutRef, useState, useContext } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button } from './Button';
import { Address, CustomerUpdating } from '../types';
import { UpdatingField } from './UpdatingField';
import { updatingValidationSchema } from '../utils/updatingValidation';
import { UpdatingSelectField } from './UpdatingSelectField';
import { updateUser } from '../services/commercetoolsApi';
import { Context } from '../store/Context';

const UpdatingForm = observer(({ ...initialValues }: PropsWithoutRef<CustomerUpdating>) => {
  const { user } = useContext(Context);

  const [showedPage, setShowedPage] = useState('userInfo');
  const [isUpdatePersonalDataForm, setIsUpdatePersonalDataForm] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });
  const [isChangePersonalDataForm, setIsChangePersonalDataForm] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });

  const isUpdatePersonalData =
    isUpdatePersonalDataForm.firstName ||
    isUpdatePersonalDataForm.lastName ||
    isUpdatePersonalDataForm.dateOfBirth;

  const isChangePersonalData =
    isChangePersonalDataForm.firstName ||
    isChangePersonalDataForm.lastName ||
    isChangePersonalDataForm.dateOfBirth;

  const getAllAddressIds = (): { [key: string]: string[] } => {
    const addressIds: { [key: string]: string[] } = {
      shippingAddresses: [],
      billingAddresses: [],
      addresses: [],
    };
    initialValues.shippingAddresses.forEach((address) => {
      if (address.id) {
        addressIds.shippingAddresses.push(address.id);
      }
    });
    initialValues.billingAddresses.forEach((address) => {
      if (address.id) {
        addressIds.billingAddresses.push(address.id);
      }
    });
    initialValues.addresses.forEach((address) => {
      if (address.id) {
        addressIds.addresses.push(address.id);
      }
    });
    return addressIds;
  };

  const updatingAddressObject = (
    ids: { [key: string]: string[] },
    state: { [key: string]: { [key: string]: boolean } } = {}
  ): { [key: string]: { [key: string]: boolean } } => {
    const allAddressIds = getAllAddressIds();
    return Object.keys(allAddressIds).reduce<{ [key: string]: { [key: string]: boolean } }>(
      (acc, key) => {
        acc[key] = allAddressIds[key].reduce<{ [key: string]: boolean }>((accInner, id) => {
          if (ids?.[key]?.includes(id)) {
            // eslint-disable-next-line no-param-reassign
            accInner[id] = true;
          } else {
            // eslint-disable-next-line no-param-reassign
            accInner[id] = state[key]?.[id] || false;
          }
          return accInner;
        }, {});
        return acc;
      },
      {}
    );
  };

  const [isUpdateAddress, setIsUpdateAddress] = useState(updatingAddressObject({}));

  const setIsUpdateFieldsOfPersonalDataForm = (name: string, value: boolean) => {
    setIsUpdatePersonalDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const setIsChangeFieldsOfPersonalDataForm = (name: string, value: boolean) => {
    setIsChangePersonalDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const isUpdateAddresForm = [
    ...Object.values(isUpdateAddress)
      .map((addressesIds) => Object.values(addressesIds))
      .flat(),
  ].some((value) => value === true);

  const changePage = (namePage: string) => {
    if (showedPage !== namePage) {
      setShowedPage(namePage);
    }
  };

  const preparePersonalDataForSave = (
    values: Partial<Record<'firstName' | 'lastName' | 'dateOfBirth', string>>,
    fieldValuesSettings: { firstName: boolean; lastName: boolean; dateOfBirth: boolean }
  ): {
    [key: string]:
      | string
      | number
      | boolean
      | Address
      | Address[]
      | number[]
      | boolean[]
      | undefined;
    action: string;
  }[] => {
    const firstName = {
      action: fieldValuesSettings.firstName ? 'setFirstName' : 'unset',
      firstName: values.firstName,
    };
    const lastName = {
      action: fieldValuesSettings.lastName ? 'setLastName' : 'unset',
      lastName: values.lastName,
    };
    const dateOfBirth = {
      action: fieldValuesSettings.dateOfBirth ? 'setDateOfBirth' : 'unset',
      dateOfBirth: values.dateOfBirth,
    };
    return [firstName, lastName, dateOfBirth].filter(({ action }) => action !== 'unset');
  };

  const savePersonalData = async (
    type: string,
    values: Partial<Record<'firstName' | 'lastName' | 'dateOfBirth', string>>
  ) => {
    if (type === 'firstName') {
      const data = preparePersonalDataForSave(values, {
        firstName: true,
        lastName: false,
        dateOfBirth: false,
      });
      try {
        const userData = await updateUser(
          data,
          initialValues.id,
          initialValues.bearerToken,
          initialValues.version
        );
        const userToken = user?.user?.token;
        if (userToken) {
          user?.setUser({ user: userData, token: userToken });
        }
        setIsChangePersonalDataForm({ ...isChangePersonalDataForm, firstName: false });
        setIsUpdatePersonalDataForm({ ...isUpdatePersonalDataForm, firstName: false });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    if (type === 'lastName') {
      const data = preparePersonalDataForSave(values, {
        firstName: false,
        lastName: true,
        dateOfBirth: false,
      });
      try {
        const userData = await updateUser(
          data,
          initialValues.id,
          initialValues.bearerToken,
          initialValues.version
        );
        const userToken = user?.user?.token;
        if (userToken) {
          user?.setUser({ user: userData, token: userToken });
        }
        setIsChangePersonalDataForm({ ...isChangePersonalDataForm, lastName: false });
        setIsUpdatePersonalDataForm({ ...isUpdatePersonalDataForm, lastName: false });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    if (type === 'dateOfBirth') {
      const data = preparePersonalDataForSave(values, {
        firstName: false,
        lastName: false,
        dateOfBirth: true,
      });
      try {
        const userData = await updateUser(
          data,
          initialValues.id,
          initialValues.bearerToken,
          initialValues.version
        );
        const userToken = user?.user?.token;
        if (userToken) {
          user?.setUser({ user: userData, token: userToken });
        }
        setIsChangePersonalDataForm({ ...isChangePersonalDataForm, dateOfBirth: false });
        setIsUpdatePersonalDataForm({ ...isUpdatePersonalDataForm, dateOfBirth: false });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    if (type === 'all') {
      const data = preparePersonalDataForSave(values, isChangePersonalDataForm);
      try {
        const userData = await updateUser(
          data,
          initialValues.id,
          initialValues.bearerToken,
          initialValues.version
        );
        const userToken = user?.user?.token;
        if (userToken) {
          user?.setUser({ user: userData, token: userToken });
        }
        setIsChangePersonalDataForm({
          firstName: false,
          lastName: false,
          dateOfBirth: false,
        });
        setIsUpdatePersonalDataForm({
          firstName: false,
          lastName: false,
          dateOfBirth: false,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
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
        validationSchema={updatingValidationSchema}
      >
        {({ values, setFieldTouched, validateField, setFieldValue }) => (
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
                  isUpdateForm={isUpdatePersonalDataForm.firstName}
                  setIsUpdateFields={setIsUpdateFieldsOfPersonalDataForm}
                  initValue={initialValues.firstName}
                  setIsChangeFields={setIsChangeFieldsOfPersonalDataForm}
                  setFieldValue={setFieldValue}
                  isChangeField={isChangePersonalDataForm.firstName}
                  onSave={async () => {
                    await savePersonalData('firstName', { firstName: values.firstName });
                  }}
                />

                <UpdatingField
                  label="Фамилия"
                  name="lastName"
                  placeholder="Введите фамилию"
                  type="text"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                  isUpdateForm={isUpdatePersonalDataForm.lastName}
                  setIsUpdateFields={setIsUpdateFieldsOfPersonalDataForm}
                  initValue={initialValues.lastName}
                  setIsChangeFields={setIsChangeFieldsOfPersonalDataForm}
                  setFieldValue={setFieldValue}
                  isChangeField={isChangePersonalDataForm.lastName}
                  onSave={async () => {
                    await savePersonalData('lastName', { lastName: values.lastName });
                  }}
                />

                <UpdatingField
                  label="Дата рождения"
                  name="dateOfBirth"
                  type="date"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                  isUpdateForm={isUpdatePersonalDataForm.dateOfBirth}
                  setIsUpdateFields={setIsUpdateFieldsOfPersonalDataForm}
                  initValue={initialValues.dateOfBirth}
                  setIsChangeFields={setIsChangeFieldsOfPersonalDataForm}
                  setFieldValue={setFieldValue}
                  isChangeField={isChangePersonalDataForm.dateOfBirth}
                  onSave={async () => {
                    await savePersonalData('dateOfBirth', { dateOfBirth: values.dateOfBirth });
                  }}
                />

                {!isUpdatePersonalData && (
                  <Button
                    className="button"
                    type="button"
                    onClick={() => {
                      setIsUpdatePersonalDataForm({
                        firstName: true,
                        lastName: true,
                        dateOfBirth: true,
                      });
                    }}
                  >
                    Редактировать профиль
                  </Button>
                )}

                {isUpdatePersonalData && (
                  <Button
                    className="button"
                    type="button"
                    disabled={!isChangePersonalData}
                    onClick={async () => {
                      if (isChangePersonalData) {
                        await savePersonalData('all', {
                          firstName: values.firstName,
                          lastName: values.lastName,
                          dateOfBirth: values.dateOfBirth,
                        });
                      }
                    }}
                  >
                    Сохранить
                  </Button>
                )}
                {isUpdatePersonalData && (
                  <Button
                    className="button"
                    type="button"
                    onClick={() => {
                      setIsUpdatePersonalDataForm({
                        firstName: false,
                        lastName: false,
                        dateOfBirth: false,
                      });
                      setFieldValue('firstName', initialValues.firstName, true);
                      setFieldValue('lastName', initialValues.lastName, true);
                      setFieldValue('dateOfBirth', initialValues.dateOfBirth, true);
                      setIsChangePersonalDataForm({
                        firstName: false,
                        lastName: false,
                        dateOfBirth: false,
                      });
                    }}
                  >
                    Отменить
                  </Button>
                )}
              </div>
            )}
            {showedPage === 'address' && (
              <>
                <div className="button-wrapp">
                  {!isUpdateAddresForm && (
                    <Button
                      className="button"
                      type="button"
                      onClick={() => {
                        setIsUpdateAddress(updatingAddressObject(getAllAddressIds()));
                      }}
                    >
                      Редактировать адреса
                    </Button>
                  )}

                  {isUpdateAddresForm && (
                    <Button className="button" type="button" onClick={() => {}}>
                      Сохранить
                    </Button>
                  )}
                  {isUpdateAddresForm && (
                    <Button
                      className="button"
                      type="button"
                      onClick={() => {
                        setIsUpdateAddress(updatingAddressObject({}));
                      }}
                    >
                      Отменить
                    </Button>
                  )}
                </div>
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
                              <div className="button-wrapper">
                                {!isUpdateAddress.shippingAddresses[address.id || ''] && (
                                  <Button
                                    className="button"
                                    type="button"
                                    onClick={() => {
                                      setIsUpdateAddress({
                                        ...isUpdateAddress,
                                        shippingAddresses: {
                                          ...isUpdateAddress.shippingAddresses,
                                          [address.id || '']: true,
                                        },
                                      });
                                    }}
                                  >
                                    Редактировать этот адрес
                                  </Button>
                                )}

                                {isUpdateAddress.shippingAddresses[address.id || ''] && (
                                  <Button className="button" type="button" onClick={() => {}}>
                                    Сохранить
                                  </Button>
                                )}
                                {isUpdateAddress.shippingAddresses[address.id || ''] && (
                                  <Button
                                    className="button"
                                    type="button"
                                    onClick={() => {
                                      setIsUpdateAddress({
                                        ...isUpdateAddress,
                                        shippingAddresses: {
                                          ...isUpdateAddress.shippingAddresses,
                                          [address.id || '']: false,
                                        },
                                      });
                                    }}
                                  >
                                    Отменить
                                  </Button>
                                )}
                              </div>
                              {address.id === values.defaultShippingAddressId && (
                                <span>Адрес доставки по умолчанию</span>
                              )}

                              <UpdatingSelectField
                                label="Страна"
                                name={`shippingAddresses.${index}.country`}
                                placeholder="Введите страну"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                                refFieldName={`shippingAddresses.${index}.postalCode`}
                                isUpdateForm={isUpdateAddress.shippingAddresses[address.id || '']}
                              />
                              <UpdatingField
                                label="Город"
                                name={`shippingAddresses.${index}.city`}
                                placeholder="Введите город"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                                isUpdateForm={isUpdateAddress.shippingAddresses[address.id || '']}
                              />
                              <UpdatingField
                                label="Улица"
                                name={`shippingAddresses.${index}.streetName`}
                                placeholder="Введите улицу"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                                isUpdateForm={isUpdateAddress.shippingAddresses[address.id || '']}
                              />
                              <UpdatingField
                                label="Индекс"
                                name={`shippingAddresses.${index}.postalCode`}
                                placeholder="Введите индекс"
                                type="text"
                                touch={{ setFieldTouched }}
                                valid={{ validateField }}
                                isUpdateForm={isUpdateAddress.shippingAddresses[address.id || '']}
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
                                <div className="button-wrapper">
                                  {!isUpdateAddress.billingAddresses[address.id || ''] && (
                                    <Button
                                      className="button"
                                      type="button"
                                      onClick={() => {
                                        setIsUpdateAddress({
                                          ...isUpdateAddress,
                                          billingAddresses: {
                                            ...isUpdateAddress.billingAddresses,
                                            [address.id || '']: true,
                                          },
                                        });
                                      }}
                                    >
                                      Редактировать этот адрес
                                    </Button>
                                  )}

                                  {isUpdateAddress.billingAddresses[address.id || ''] && (
                                    <Button className="button" type="button" onClick={() => {}}>
                                      Сохранить
                                    </Button>
                                  )}
                                  {isUpdateAddress.billingAddresses[address.id || ''] && (
                                    <Button
                                      className="button"
                                      type="button"
                                      onClick={() => {
                                        setIsUpdateAddress({
                                          ...isUpdateAddress,
                                          billingAddresses: {
                                            ...isUpdateAddress.billingAddresses,
                                            [address.id || '']: false,
                                          },
                                        });
                                      }}
                                    >
                                      Отменить
                                    </Button>
                                  )}
                                </div>
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
                                  isUpdateForm={isUpdateAddress.billingAddresses[address.id || '']}
                                />
                                <UpdatingField
                                  label="Город"
                                  name={`billingAddresses.${index}.city`}
                                  placeholder="Введите город"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.billingAddresses[address.id || '']}
                                />
                                <UpdatingField
                                  label="Улица"
                                  name={`billingAddresses.${index}.streetName`}
                                  placeholder="Введите улицу"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.billingAddresses[address.id || '']}
                                />
                                <UpdatingField
                                  label="Индекс"
                                  name={`billingAddresses.${index}.postalCode`}
                                  placeholder="Введите индекс"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.billingAddresses[address.id || '']}
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
                                <div className="button-wrapper">
                                  {!isUpdateAddress.addresses[address.id || ''] && (
                                    <Button
                                      className="button"
                                      type="button"
                                      onClick={() => {
                                        setIsUpdateAddress({
                                          ...isUpdateAddress,
                                          addresses: {
                                            ...isUpdateAddress.addresses,
                                            [address.id || '']: true,
                                          },
                                        });
                                      }}
                                    >
                                      Редактировать этот адрес
                                    </Button>
                                  )}

                                  {isUpdateAddress.addresses[address.id || ''] && (
                                    <Button className="button" type="button" onClick={() => {}}>
                                      Сохранить
                                    </Button>
                                  )}
                                  {isUpdateAddress.addresses[address.id || ''] && (
                                    <Button
                                      className="button"
                                      type="button"
                                      onClick={() => {
                                        setIsUpdateAddress({
                                          ...isUpdateAddress,
                                          addresses: {
                                            ...isUpdateAddress.addresses,
                                            [address.id || '']: false,
                                          },
                                        });
                                      }}
                                    >
                                      Отменить
                                    </Button>
                                  )}
                                </div>
                                <UpdatingField
                                  label="Страна"
                                  name={`addresses.${index}.country`}
                                  placeholder="Введите страну"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.addresses[address.id || '']}
                                />
                                <UpdatingField
                                  label="Город"
                                  name={`addresses.${index}.city`}
                                  placeholder="Введите город"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.addresses[address.id || '']}
                                />
                                <UpdatingField
                                  label="Улица"
                                  name={`addresses.${index}.streetName`}
                                  placeholder="Введите улицу"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.addresses[address.id || '']}
                                />
                                <UpdatingField
                                  label="Индекс"
                                  name={`addresses.${index}.postalCode`}
                                  placeholder="Введите индекс"
                                  type="text"
                                  touch={{ setFieldTouched }}
                                  valid={{ validateField }}
                                  isUpdateForm={isUpdateAddress.addresses[address.id || '']}
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
                  // isUpdateForm={isUpdatePersonalDataForm}
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
