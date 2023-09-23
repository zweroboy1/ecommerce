import { useState, useContext, useEffect } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { Address, Customer, UpdatingAddressesInitialValues } from '../types';
import { updatingValidationSchema } from '../utils/updatingValidation';
import {
  addAddress,
  addSpecialAddress,
  removeAddress,
  updateUser,
} from '../services/commercetoolsApi';
import { Context } from '../store/Context';
import { prepareCustomerAddressesUpdating } from '../utils/prepareCustomerUpdating';
import 'react-toastify/dist/ReactToastify.css';
import { AddAddressesForm } from './AddAddress';
import { UpdatingAddressForm } from './UpdatingAddress';

const UpdatingAddressesForm = observer(() => {
  const { user } = useContext(Context);

  if (!user || user.user === null || user.user.user === null) {
    return null;
  }

  const [initialValues, setInitialValues] = useState<UpdatingAddressesInitialValues>({
    ...prepareCustomerAddressesUpdating(user!.user!.user!),
    newCity: '',
    newCountry: '',
    newPostalCode: '',
    newStreetName: '',
    isShippingAddress: false,
    isBillingAddress: false,
  });

  const [isValidAddressesFields, setIsValidAddressesFields] = useState<{
    [key: string]: { [key: string]: { [key: string]: boolean } };
  }>({
    addresses: initialValues.addresses.reduce<{ [key: string]: { [key: string]: boolean } }>(
      (acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: true,
            city: true,
            street: true,
            postalCode: true,
          };
        }
        return acc;
      },
      {}
    ),
    shippingAddresses: initialValues.shippingAddresses.reduce<{
      [key: string]: { [key: string]: boolean };
    }>((acc, address) => {
      if (address.id) {
        acc[address.id] = {
          country: true,
          city: true,
          street: true,
          postalCode: true,
        };
      }
      return acc;
    }, {}),
    billingAddresses: initialValues.billingAddresses.reduce<{
      [key: string]: { [key: string]: boolean };
    }>((acc, address) => {
      if (address.id) {
        acc[address.id] = {
          country: true,
          city: true,
          street: true,
          postalCode: true,
        };
      }
      return acc;
    }, {}),
  });

  const isValidAddress = (type: string, id: string) => {
    return Object.values(isValidAddressesFields[type][id]).every((value) => value === true);
  };

  useEffect(() => {
    const newIsValidAddressesFields = {
      addresses: initialValues.addresses.reduce<{ [key: string]: { [key: string]: boolean } }>(
        (acc, address) => {
          if (address.id) {
            acc[address.id] = {
              country: true,
              city: true,
              street: true,
              postalCode: true,
            };
          }
          return acc;
        },
        {}
      ),
      shippingAddresses: initialValues.shippingAddresses.reduce<{
        [key: string]: { [key: string]: boolean };
      }>((acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: true,
            city: true,
            street: true,
            postalCode: true,
          };
        }
        return acc;
      }, {}),
      billingAddresses: initialValues.billingAddresses.reduce<{
        [key: string]: { [key: string]: boolean };
      }>((acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: true,
            city: true,
            street: true,
            postalCode: true,
          };
        }
        return acc;
      }, {}),
    };

    setIsValidAddressesFields(newIsValidAddressesFields);
  }, [initialValues]);
  const [isCheckAsShippingAddress, setIsCheckAsShippingAddress] = useState<string[]>([]);

  const [isCheckAsBillingAddress, setIsCheckAsBillingAddress] = useState<string[]>([]);

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

  const initialAddressesObject = () => {
    const objOfAddressesFields: { [key: string]: { [key: string]: { [key: string]: boolean } } } = {
      shippingAddresses: {},
      billingAddresses: {},
      addresses: {},
    };
    initialValues.shippingAddresses.forEach((address) => {
      if (address.id) {
        objOfAddressesFields.shippingAddresses[address.id] = {
          country: false,
          city: false,
          street: false,
          postalCode: false,
        };
      }
    });
    initialValues.billingAddresses.forEach((address) => {
      if (address.id) {
        objOfAddressesFields.billingAddresses[address.id] = {
          country: false,
          city: false,
          street: false,
          postalCode: false,
        };
      }
    });
    initialValues.addresses.forEach((address) => {
      if (address.id) {
        objOfAddressesFields.addresses[address.id] = {
          country: false,
          city: false,
          street: false,
          postalCode: false,
        };
      }
    });
    return objOfAddressesFields;
  };

  const [isUpdateAddressesForm, setIsUpdateAddressesForm] = useState(updatingAddressObject({}));

  const [isChangeAddressesForm, setIsChangeAddressesForm] = useState<{
    [key: string]: { [key: string]: { [key: string]: boolean } };
  }>({
    addresses: initialValues.addresses.reduce<{ [key: string]: { [key: string]: boolean } }>(
      (acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: false,
            city: false,
            street: false,
            postalCode: false,
          };
        }
        return acc;
      },
      {}
    ),
    shippingAddresses: initialValues.shippingAddresses.reduce<{
      [key: string]: { [key: string]: boolean };
    }>((acc, address) => {
      if (address.id) {
        acc[address.id] = {
          country: false,
          city: false,
          street: false,
          postalCode: false,
        };
      }
      return acc;
    }, {}),
    billingAddresses: initialValues.billingAddresses.reduce<{
      [key: string]: { [key: string]: boolean };
    }>((acc, address) => {
      if (address.id) {
        acc[address.id] = {
          country: false,
          city: false,
          street: false,
          postalCode: false,
        };
      }
      return acc;
    }, {}),
  });

  const isChangeAddress = (type: string, id: string) => {
    return Object.values(isChangeAddressesForm[type][id]).some((value) => value === true);
  };

  useEffect(() => {
    const newIsChangeAddressesForm = {
      addresses: initialValues.addresses.reduce<{ [key: string]: { [key: string]: boolean } }>(
        (acc, address) => {
          if (address.id) {
            acc[address.id] = {
              country: false,
              city: false,
              street: false,
              postalCode: false,
            };
          }
          return acc;
        },
        {}
      ),
      shippingAddresses: initialValues.shippingAddresses.reduce<{
        [key: string]: { [key: string]: boolean };
      }>((acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: false,
            city: false,
            street: false,
            postalCode: false,
          };
        }
        return acc;
      }, {}),
      billingAddresses: initialValues.billingAddresses.reduce<{
        [key: string]: { [key: string]: boolean };
      }>((acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: false,
            city: false,
            street: false,
            postalCode: false,
          };
        }
        return acc;
      }, {}),
    };

    setIsChangeAddressesForm(newIsChangeAddressesForm);
  }, [initialValues]);

  const setIsChangeFieldOfShippingAddressesForm = (id: string, name: string, value: boolean) => {
    setIsChangeAddressesForm((prev) => ({
      ...prev,
      shippingAddresses: {
        ...prev.shippingAddresses,
        [id]: { ...prev.shippingAddresses[id], [name]: value },
      },
    }));
  };

  const setIsChangeFieldOfBillingAddressesForm = (id: string, name: string, value: boolean) => {
    setIsChangeAddressesForm((prev) => ({
      ...prev,
      billingAddresses: {
        ...prev.billingAddresses,
        [id]: { ...prev.billingAddresses[id], [name]: value },
      },
    }));
  };

  const setIsChangeFieldOfAddressesForm = (id: string, name: string, value: boolean) => {
    setIsChangeAddressesForm((prev) => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        [id]: { ...prev.addresses[id], [name]: value },
      },
    }));
  };

  const resetChangeAddressesOfId = (type: string, id: string) => {
    setIsChangeAddressesForm((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: {
          country: false,
          city: false,
          street: false,
          postalCode: false,
        },
      },
    }));
  };

  const cb = () => {
    setInitialValues({
      ...prepareCustomerAddressesUpdating(user!.user!.user!),
      newCity: '',
      newCountry: '',
      newPostalCode: '',
      newStreetName: '',
      isShippingAddress: false,
      isBillingAddress: false,
    });
    setIsValidAddressesFields({
      addresses: initialValues.addresses.reduce<{ [key: string]: { [key: string]: boolean } }>(
        (acc, address) => {
          if (address.id) {
            acc[address.id] = {
              country: true,
              city: true,
              street: true,
              postalCode: true,
            };
          }
          return acc;
        },
        {}
      ),
      shippingAddresses: initialValues.shippingAddresses.reduce<{
        [key: string]: { [key: string]: boolean };
      }>((acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: true,
            city: true,
            street: true,
            postalCode: true,
          };
        }
        return acc;
      }, {}),
      billingAddresses: initialValues.billingAddresses.reduce<{
        [key: string]: { [key: string]: boolean };
      }>((acc, address) => {
        if (address.id) {
          acc[address.id] = {
            country: true,
            city: true,
            street: true,
            postalCode: true,
          };
        }
        return acc;
      }, {}),
    });
  };

  const saveAddress = async (
    address: Address,
    isShipping: boolean,
    isBilling: boolean,
    isChanged: boolean
  ) => {
    const data = {
      action: 'changeAddress',
      addressId: address.id,
      address: { ...address },
    };
    try {
      let userData: Customer;
      if (isChanged) {
        userData = await updateUser(
          [data],
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
      }
      if (isShipping) {
        userData = await addSpecialAddress(
          address.id || '',
          'shipping',
          isChanged ? userData!.id : user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          isChanged ? userData!.version : user?.getUser()!.user!.version || 1
        );
      }
      if (isBilling) {
        if (isShipping) {
          userData = await addAddress(
            {
              country: address.country,
              city: address.city,
              streetName: address.streetName,
              postalCode: address.postalCode,
            },
            userData!.id,
            user?.getUser()!.token.access_token || '',
            userData!.version
          );
        }
        userData = await addSpecialAddress(
          isShipping
            ? userData!.addresses[userData!.addresses.length - 1].id || ''
            : address.id || '',
          'billing',
          isShipping || isChanged ? userData!.id : user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          isShipping || isChanged ? userData!.version : user?.getUser()!.user!.version || 1
        );
      }
      const userToken = user?.user?.token;
      const userCard = user?.user?.cart;
      if (userToken) {
        user?.setUser({ user: userData!, cart: userCard!, token: userToken });
        cb();
      }

      if (address.id && isCheckAsBillingAddress.includes(address.id)) {
        setIsCheckAsBillingAddress([...isCheckAsBillingAddress.filter((id) => id !== address.id)]);
      }
      if (address.id && isCheckAsShippingAddress.includes(address.id)) {
        setIsCheckAsShippingAddress([
          ...isCheckAsShippingAddress.filter((id) => id !== address.id),
        ]);
      }
      setIsUpdateAddressesForm(updatingAddressObject({}));
      setIsChangeAddressesForm(initialAddressesObject());
      toast.success('Изменения успешно сохранены!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const userData = await removeAddress(
        addressId,
        user?.getUser()!.user!.id || '',
        user?.getUser()!.token.access_token || '',
        user?.getUser()!.user!.version || 1
      );

      const userToken = user?.user?.token;
      const userCard = user?.user?.cart;
      if (userToken) {
        user?.setUser({ user: userData, cart: userCard!, token: userToken });
        cb();
      }
      toast.success('Адрес успешно удален!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
  const setDefaultAddress = async (addressId: string, type: string) => {
    const data = {
      action: type === 'billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
      addressId,
    };

    try {
      const userData = await updateUser(
        [data],
        user?.getUser()!.user!.id || '',
        user?.getUser()!.token.access_token || '',
        user?.getUser()!.user!.version || 1
      );

      const userToken = user?.user?.token;
      const userCard = user?.user?.cart;
      if (userToken) {
        user?.setUser({ user: userData, cart: userCard!, token: userToken });
        cb();
      }
      toast.success(
        `Адрес ${type === 'billing' ? 'оплаты' : 'доставки'} по умолчанию успешно установлен!`,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        }
      );
    } catch (error) {
      toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="user-address">
      <AddAddressesForm cb={cb} />
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={updatingValidationSchema}
        enableReinitialize={true}
      >
        {({ values, setFieldTouched, validateField, setFieldValue }) => {
          return (
            <Form>
              <>
                <div className="address-row">
                  <h2>Адреса доставки</h2>
                  <FieldArray
                    name="shippingAddresses"
                    render={() => (
                      <>
                        {values.shippingAddresses &&
                          values.shippingAddresses.length > 0 &&
                          values.shippingAddresses.map(
                            (address, index) =>
                              address.id && (
                                <UpdatingAddressForm
                                  addressType="shippingAddresses"
                                  key={address.id}
                                  initialValues={initialValues}
                                  values={values}
                                  address={address}
                                  index={index}
                                  isUpdateAddressesForm={isUpdateAddressesForm}
                                  setIsUpdateAddressesForm={setIsUpdateAddressesForm}
                                  deleteAddress={deleteAddress}
                                  saveAddress={saveAddress}
                                  isChangeAddress={isChangeAddress}
                                  isValidAddress={isValidAddress}
                                  resetChangeAddressesOfId={resetChangeAddressesOfId}
                                  setFieldValue={setFieldValue}
                                  setDefaultAddress={setDefaultAddress}
                                  setFieldTouched={setFieldTouched}
                                  validateField={validateField}
                                  setIsChangeFieldOfShippingAddressesForm={
                                    setIsChangeFieldOfShippingAddressesForm
                                  }
                                  setIsChangeFieldOfBillingAddressesForm={
                                    setIsChangeFieldOfBillingAddressesForm
                                  }
                                  setIsChangeFieldOfAddressesForm={setIsChangeFieldOfAddressesForm}
                                  isChangeAddressesForm={isChangeAddressesForm}
                                  isValidAddressesFields={isValidAddressesFields}
                                  setIsValidAddressesFields={setIsValidAddressesFields}
                                  isCheckAsShippingAddress={isCheckAsShippingAddress}
                                  setIsCheckAsShippingAddress={setIsCheckAsShippingAddress}
                                  isCheckAsBillingAddress={isCheckAsBillingAddress}
                                  setIsCheckAsBillingAddress={setIsCheckAsBillingAddress}
                                />
                              )
                          )}
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
                          values.billingAddresses.map(
                            (address, index) =>
                              address.id && (
                                <UpdatingAddressForm
                                  addressType="billingAddresses"
                                  key={address.id}
                                  initialValues={initialValues}
                                  values={values}
                                  address={address}
                                  index={index}
                                  isUpdateAddressesForm={isUpdateAddressesForm}
                                  setIsUpdateAddressesForm={setIsUpdateAddressesForm}
                                  deleteAddress={deleteAddress}
                                  saveAddress={saveAddress}
                                  isChangeAddress={isChangeAddress}
                                  isValidAddress={isValidAddress}
                                  resetChangeAddressesOfId={resetChangeAddressesOfId}
                                  setFieldValue={setFieldValue}
                                  setDefaultAddress={setDefaultAddress}
                                  setFieldTouched={setFieldTouched}
                                  validateField={validateField}
                                  setIsChangeFieldOfShippingAddressesForm={
                                    setIsChangeFieldOfShippingAddressesForm
                                  }
                                  setIsChangeFieldOfBillingAddressesForm={
                                    setIsChangeFieldOfBillingAddressesForm
                                  }
                                  setIsChangeFieldOfAddressesForm={setIsChangeFieldOfAddressesForm}
                                  isChangeAddressesForm={isChangeAddressesForm}
                                  isValidAddressesFields={isValidAddressesFields}
                                  setIsValidAddressesFields={setIsValidAddressesFields}
                                  isCheckAsShippingAddress={isCheckAsShippingAddress}
                                  setIsCheckAsShippingAddress={setIsCheckAsShippingAddress}
                                  isCheckAsBillingAddress={isCheckAsBillingAddress}
                                  setIsCheckAsBillingAddress={setIsCheckAsBillingAddress}
                                />
                              )
                          )}
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
                            values.addresses.map(
                              (address, index) =>
                                address.id && (
                                  <UpdatingAddressForm
                                    addressType="addresses"
                                    key={address.id}
                                    initialValues={initialValues}
                                    values={values}
                                    address={address}
                                    index={index}
                                    isUpdateAddressesForm={isUpdateAddressesForm}
                                    setIsUpdateAddressesForm={setIsUpdateAddressesForm}
                                    deleteAddress={deleteAddress}
                                    saveAddress={saveAddress}
                                    isChangeAddress={isChangeAddress}
                                    isValidAddress={isValidAddress}
                                    resetChangeAddressesOfId={resetChangeAddressesOfId}
                                    setFieldValue={setFieldValue}
                                    setDefaultAddress={setDefaultAddress}
                                    setFieldTouched={setFieldTouched}
                                    validateField={validateField}
                                    setIsChangeFieldOfShippingAddressesForm={
                                      setIsChangeFieldOfShippingAddressesForm
                                    }
                                    setIsChangeFieldOfBillingAddressesForm={
                                      setIsChangeFieldOfBillingAddressesForm
                                    }
                                    setIsChangeFieldOfAddressesForm={
                                      setIsChangeFieldOfAddressesForm
                                    }
                                    isChangeAddressesForm={isChangeAddressesForm}
                                    isValidAddressesFields={isValidAddressesFields}
                                    setIsValidAddressesFields={setIsValidAddressesFields}
                                    isCheckAsShippingAddress={isCheckAsShippingAddress}
                                    setIsCheckAsShippingAddress={setIsCheckAsShippingAddress}
                                    isCheckAsBillingAddress={isCheckAsBillingAddress}
                                    setIsCheckAsBillingAddress={setIsCheckAsBillingAddress}
                                  />
                                )
                            )}
                        </>
                      )}
                    />
                  </div>
                )}
              </>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
});

export { UpdatingAddressesForm };
