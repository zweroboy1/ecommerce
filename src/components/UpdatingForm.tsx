import { useState, useContext, useEffect } from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from './Button';
import { Address, Customer, UpdatingInitialValues } from '../types';
import { UpdatingField } from './UpdatingField';
import {
  dateOfBirthValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
  newCityValidation,
  newPostalCodeValidation,
  newStreetNameValidation,
  updatingAddressValidationSchema,
  updatingPasswordValidationSchema,
  updatingValidationSchema,
} from '../utils/updatingValidation';
import { UpdatingSelectField } from './UpdatingSelectField';
import {
  addAddress,
  addSpecialAddress,
  changePassword,
  removeAddress,
  updateUser,
} from '../services/commercetoolsApi';
import { Context } from '../store/Context';
import { prepareCustomerUpdating } from '../utils/prepareCustomerUpdating';
import 'react-toastify/dist/ReactToastify.css';
import { UpdatingInput } from './UpdatingInput';
import { UpdatingSelectInput } from './UpdatingSelectInput';

const UpdatingForm = observer(() => {
  const { user } = useContext(Context);

  const [initialValues, setInitialValues] = useState<UpdatingInitialValues>({
    ...prepareCustomerUpdating(user!.user!.user!, user!.user!.token.access_token),
    bearerToken: user!.user!.token.access_token,
    password: '',
    passwordNew: '',
    passwordConfirm: '',
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

  // const isValidAddressesOfType = (type: 'shippingAddresses' | 'billingAddresses' | 'addresses') =>
  //   Object.values(isValidAddressesFields[type]).every((address) => {
  //     return Object.values(address).every((value) => value === true);
  //   });

  // const [isValidAddresses, setIsValidAddresses] = useState(
  //   isValidAddressesOfType('shippingAddresses') &&
  //     isValidAddressesOfType('billingAddresses') &&
  //     isValidAddressesOfType('addresses')
  // );

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
  const [isValidPersonalDataFields, setIsValidPersonalDataFields] = useState({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
  });
  const [isChangeNewAddressForm, setIsChangeNewAddressForm] = useState({
    newCountry: false,
    newCity: false,
    newStreetName: false,
    newPostalCode: false,
  });
  const [isValidNewAddressFields, setIsValidNewAddressFields] = useState({
    newCountry: true,
    newCity: true,
    newStreetName: true,
    newPostalCode: true,
  });
  const [isShippingAddress, setIsShippingAddress] = useState(initialValues.isShippingAddress);
  const [isBillingAddress, setIsBillingAddress] = useState(initialValues.isBillingAddress);
  const isChangeNewAddress =
    isChangeNewAddressForm.newCountry &&
    isChangeNewAddressForm.newCity &&
    isChangeNewAddressForm.newStreetName &&
    isChangeNewAddressForm.newPostalCode;
  const isValidNewAddress =
    isValidNewAddressFields.newCountry &&
    isValidNewAddressFields.newCity &&
    isValidNewAddressFields.newStreetName &&
    isValidNewAddressFields.newPostalCode;

  const [isUpdateUserSettingsForm, setIsUpdateUserSettingsForm] = useState({
    email: false,
    password: false,
    passwordNew: false,
    passwordConfirm: false,
  });
  const [isValidPasswordFields, setIsValidPasswordFields] = useState({
    password: true,
    passwordNew: true,
    passwordConfirm: true,
  });

  const setIsUpdateFieldsOfUserSettingsForm = (name: string, value: boolean) => {
    setIsUpdateUserSettingsForm((prev) => ({ ...prev, [name]: value }));
  };

  const [isChangeUserSettingsForm, setIsChangeUserSettingsForm] = useState({
    email: false,
    password: false,
    passwordNew: false,
    passwordConfirm: false,
  });

  const [isAddedAddressForm, setIsAddedAddressForm] = useState(false);

  const isChangePasswords =
    isChangeUserSettingsForm.password &&
    isChangeUserSettingsForm.passwordNew &&
    isChangeUserSettingsForm.passwordConfirm;

  const isValidPasswords =
    isValidPasswordFields.password &&
    isValidPasswordFields.passwordNew &&
    isValidPasswordFields.passwordConfirm;

  const isValidPersonalData =
    isValidPersonalDataFields.firstName &&
    isValidPersonalDataFields.lastName &&
    isValidPersonalDataFields.dateOfBirth;

  const isUpdatePersonalData =
    isUpdatePersonalDataForm.firstName ||
    isUpdatePersonalDataForm.lastName ||
    isUpdatePersonalDataForm.dateOfBirth;

  const isChangePersonalData =
    isChangePersonalDataForm.firstName ||
    isChangePersonalDataForm.lastName ||
    isChangePersonalDataForm.dateOfBirth;

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

  // const isChangeAddressesOfType = (type: 'shippingAddresses' | 'billingAddresses' | 'addresses') =>
  //   Object.values(isChangeAddressesForm[type]).some((address) => {
  //     return Object.values(address).some((value) => value === true);
  //   });

  // const isChangeAddresses =
  //   isChangeAddressesOfType('shippingAddresses') ||
  //   isChangeAddressesOfType('billingAddresses') ||
  //   isChangeAddressesOfType('addresses');

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

  const setIsUpdateFieldsOfPersonalDataForm = (name: string, value: boolean) => {
    setIsUpdatePersonalDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const setIsChangeFieldsOfPersonalDataForm = (name: string, value: boolean) => {
    setIsChangePersonalDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const setIsChangeFieldsOfUserSettingsForm = (name: string, value: boolean) => {
    setIsChangeUserSettingsForm((prev) => ({ ...prev, [name]: value }));
  };

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

  // const isUpdateAddresForm = [
  //   ...Object.values(isUpdateAddressesForm)
  //     .map((addressesIds) => Object.values(addressesIds))
  //     .flat(),
  // ].some((value) => value === true);

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

  // const saveAddresses = async (
  //   addresses: Address[],
  //   isShipping: boolean,
  //   isBilling: boolean,
  //   isChanged: boolean
  // ) => {
  //   const data = addresses.map((address) => ({
  //     action: 'changeAddress',
  //     addressId: address.id,
  //     address: { ...address },
  //   }));
  //   try {
  //     const userData = await updateUser(
  //       data,
  //       initialValues.id,
  //       initialValues.bearerToken,
  //       initialValues.version
  //     );
  //     const userToken = user?.user?.token;
  //     if (userToken) {
  //       user?.setUser({ user: userData, token: userToken });
  //     }
  //     setIsUpdateAddressesForm(updatingAddressObject({}));
  //     setIsChangeAddressesForm(initialAddressesObject());
  //     toast.success('Изменения успешно сохранены!', {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //     });
  //   } catch (error) {
  //     toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //     });
  //   }
  // };

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
        setInitialValues({
          ...prepareCustomerUpdating(user!.user!.user!, user!.user!.token.access_token),
          bearerToken: user!.user!.token.access_token,
          password: '',
          passwordNew: '',
          passwordConfirm: '',
          newCity: '',
          newCountry: '',
          newPostalCode: '',
          newStreetName: '',
          isShippingAddress: false,
          isBillingAddress: false,
        });
        setIsValidAddressesFields({
          addresses: initialValues.addresses.reduce<{ [key: string]: { [key: string]: boolean } }>(
            (acc, addr) => {
              if (addr.id) {
                acc[addr.id] = {
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
          }>((acc, addr) => {
            if (addr.id) {
              acc[addr.id] = {
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
          }>((acc, addr) => {
            if (addr.id) {
              acc[addr.id] = {
                country: true,
                city: true,
                street: true,
                postalCode: true,
              };
            }
            return acc;
          }, {}),
        });
        // setIsValidAddresses(
        //   isValidAddressesOfType('shippingAddresses') &&
        //     isValidAddressesOfType('billingAddresses') &&
        //     isValidAddressesOfType('addresses')
        // );
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

  const savePersonalData = async (
    type: string,
    values: Partial<Record<'firstName' | 'lastName' | 'dateOfBirth' | 'email', string>>
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
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
        const userToken = user?.user?.token;
        const userCard = user?.user?.cart;
        if (userToken) {
          user?.setUser({ user: userData, cart: userCard!, token: userToken });
        }
        setIsChangePersonalDataForm({ ...isChangePersonalDataForm, firstName: false });
        setIsUpdatePersonalDataForm({ ...isUpdatePersonalDataForm, firstName: false });
        toast.success('Имя успешно изменено!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
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
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
        const userToken = user?.user?.token;
        const userCard = user?.user?.cart;
        if (userToken) {
          user?.setUser({ user: userData, cart: userCard!, token: userToken });
        }
        setIsChangePersonalDataForm({ ...isChangePersonalDataForm, lastName: false });
        setIsUpdatePersonalDataForm({ ...isUpdatePersonalDataForm, lastName: false });
        toast.success('Фамилия успешно изменена!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
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
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
        const userToken = user?.user?.token;
        const userCard = user?.user?.cart;
        if (userToken) {
          user?.setUser({ user: userData, cart: userCard!, token: userToken });
        }
        setIsChangePersonalDataForm({ ...isChangePersonalDataForm, dateOfBirth: false });
        setIsUpdatePersonalDataForm({ ...isUpdatePersonalDataForm, dateOfBirth: false });
        toast.success('Дата рождения успешно изменена!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
    if (type === 'email') {
      const data = [{ action: 'changeEmail', email: values.email }];
      try {
        const userData = await updateUser(
          data,
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
        const userToken = user?.user?.token;
        const userCard = user?.user?.cart;
        if (userToken) {
          user?.setUser({ user: userData, cart: userCard!, token: userToken });
        }
        setIsChangeUserSettingsForm({ ...isChangeUserSettingsForm, email: false });
        setIsUpdateUserSettingsForm({ ...isUpdateUserSettingsForm, email: false });
        toast.success('E-mail успешно изменен!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
    if (type === 'all') {
      const data = preparePersonalDataForSave(values, isChangePersonalDataForm);
      try {
        const userData = await updateUser(
          data,
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
        const userToken = user?.user?.token;
        const userCard = user?.user?.cart;
        if (userToken) {
          user?.setUser({ user: userData, cart: userCard!, token: userToken });
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
        toast.success('Все изменения успешно сохранены!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  const savePassword = async (values: Record<'password' | 'passwordNew', string>) => {
    const data = { password: values.password, passwordNew: values.passwordNew };
    try {
      const userData = await changePassword(
        data,
        user?.getUser()!.user!.email || '',
        user?.getUser()!.user!.id || '',
        user?.getUser()!.token.access_token || '',
        user?.getUser()!.user!.version || 1
      );

      user?.setUser({ user: userData.user, cart: userData.cart, token: userData.token });
      setIsChangeUserSettingsForm({
        ...isChangeUserSettingsForm,
        password: false,
        passwordNew: false,
        passwordConfirm: false,
      });
      setIsUpdateUserSettingsForm({
        ...isUpdateUserSettingsForm,
        password: false,
        passwordNew: false,
        passwordConfirm: false,
      });
      toast.success('Пароль успешно изменен!', {
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

  const addNewAddress = async (data: Address, isShipping: boolean, isBilling: boolean) => {
    try {
      let userData = await addAddress(
        data,
        user?.getUser()!.user!.id || '',
        user?.getUser()!.token.access_token || '',
        user?.getUser()!.user!.version || 1
      );
      if (isShipping) {
        userData = await addSpecialAddress(
          userData.addresses[userData.addresses.length - 1].id || '',
          'shipping',
          userData.id,
          user?.getUser()!.token.access_token || '',
          userData.version
        );
      }

      if (isBilling) {
        if (isShipping) {
          userData = await addAddress(
            data,
            userData.id,
            user?.getUser()!.token.access_token || '',
            userData.version
          );
        }
        userData = await addSpecialAddress(
          userData.addresses[userData.addresses.length - 1].id || '',
          'billing',
          userData.id,
          user?.getUser()!.token.access_token || '',
          userData.version
        );
      }

      const userToken = user?.user?.token;
      const userCard = user?.user?.cart;
      if (userToken) {
        user?.setUser({ user: userData, cart: userCard!, token: userToken });
        setInitialValues({
          ...prepareCustomerUpdating(user!.user!.user!, user!.user!.token.access_token),
          bearerToken: user!.user!.token.access_token,
          password: '',
          passwordNew: '',
          passwordConfirm: '',
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
        // setIsValidAddresses(
        //   isValidAddressesOfType('shippingAddresses') &&
        //     isValidAddressesOfType('billingAddresses') &&
        //     isValidAddressesOfType('addresses')
        // );
      }
      setIsChangeNewAddressForm({
        newCountry: false,
        newCity: false,
        newPostalCode: false,
        newStreetName: false,
      });
      setIsValidNewAddressFields({
        newCountry: true,
        newCity: true,
        newPostalCode: true,
        newStreetName: true,
      });
      setIsAddedAddressForm(false);
      toast.success('Адрес успешно добавлен!', {
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
        setInitialValues({
          ...prepareCustomerUpdating(user!.user!.user!, user!.user!.token.access_token),
          bearerToken: user!.user!.token.access_token,
          password: '',
          passwordNew: '',
          passwordConfirm: '',
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
        // setIsValidAddresses(
        //   isValidAddressesOfType('shippingAddresses') &&
        //     isValidAddressesOfType('billingAddresses') &&
        //     isValidAddressesOfType('addresses')
        // );
      }
      setIsChangeNewAddressForm({
        newCountry: false,
        newCity: false,
        newPostalCode: false,
        newStreetName: false,
      });
      setIsValidNewAddressFields({
        newCountry: true,
        newCity: true,
        newPostalCode: true,
        newStreetName: true,
      });
      setIsAddedAddressForm(false);
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
        setInitialValues({
          ...prepareCustomerUpdating(user!.user!.user!, user!.user!.token.access_token),
          bearerToken: user!.user!.token.access_token,
          password: '',
          passwordNew: '',
          passwordConfirm: '',
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
        // setIsValidAddresses(
        //   isValidAddressesOfType('shippingAddresses') &&
        //     isValidAddressesOfType('billingAddresses') &&
        //     isValidAddressesOfType('addresses')
        // );
      }
      setIsChangeNewAddressForm({
        newCountry: false,
        newCity: false,
        newPostalCode: false,
        newStreetName: false,
      });
      setIsValidNewAddressFields({
        newCountry: true,
        newCity: true,
        newPostalCode: true,
        newStreetName: true,
      });
      setIsAddedAddressForm(false);
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
    <div className="form-wrapper">
      <ToastContainer />
      <div className="button-wrapper">
        <Button className="button" type="button" onClick={() => changePage('userInfo')}>
          Персональные данные
        </Button>
        <Button className="button" type="button" onClick={() => changePage('address')}>
          Адреса
        </Button>
        <Button className="button" type="button" onClick={() => changePage('personalData')}>
          Настройки профиля
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={updatingValidationSchema}
        enableReinitialize={true}
      >
        {({ values, setFieldTouched, validateField, setFieldValue }) => {
          return (
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
                    setValid={async (value) => {
                      try {
                        await firstNameValidationSchema.validate(
                          {
                            firstName: value,
                          },
                          { abortEarly: false }
                        );
                        setIsValidPersonalDataFields({
                          ...isValidPersonalDataFields,
                          firstName: true,
                        });
                      } catch (error) {
                        setIsValidPersonalDataFields({
                          ...isValidPersonalDataFields,
                          firstName: false,
                        });
                      }
                    }}
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
                    setValid={async (value) => {
                      try {
                        await lastNameValidationSchema.validate(
                          {
                            lastName: value,
                          },
                          { abortEarly: false }
                        );
                        setIsValidPersonalDataFields({
                          ...isValidPersonalDataFields,
                          lastName: true,
                        });
                      } catch (error) {
                        setIsValidPersonalDataFields({
                          ...isValidPersonalDataFields,
                          lastName: false,
                        });
                      }
                    }}
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
                    setValid={async (value) => {
                      try {
                        await dateOfBirthValidationSchema.validate(
                          {
                            dateOfBirth: value,
                          },
                          { abortEarly: false }
                        );
                        setIsValidPersonalDataFields({
                          ...isValidPersonalDataFields,
                          dateOfBirth: true,
                        });
                      } catch (error) {
                        setIsValidPersonalDataFields({
                          ...isValidPersonalDataFields,
                          dateOfBirth: false,
                        });
                      }
                    }}
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
                      disabled={!isChangePersonalData || !isValidPersonalData}
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
                  {!isAddedAddressForm && (
                    <div className="button-wrapper">
                      <Button
                        className="button"
                        type="button"
                        onClick={() => {
                          setIsAddedAddressForm(true);
                        }}
                      >
                        Добавить новый адрес
                      </Button>
                    </div>
                  )}
                  {isAddedAddressForm && (
                    <div className="address-row">
                      <h2>Новый адрес</h2>

                      <UpdatingInput
                        label="Город"
                        name="newCity"
                        placeholder="Введите город"
                        type="text"
                        touch={{ setFieldTouched }}
                        valid={{ validateField }}
                        initValue={initialValues.newCity}
                        setIsChangeFields={(name: string, value: boolean) => {
                          setIsChangeNewAddressForm({ ...isChangeNewAddressForm, [name]: value });
                        }}
                        setValid={async (value) => {
                          try {
                            await newCityValidation.validate(
                              {
                                newCity: value,
                              },
                              { abortEarly: false }
                            );
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newCity: true,
                            });
                          } catch (error) {
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newCity: false,
                            });
                          }
                        }}
                        isChangeField={isChangeNewAddressForm.newCity}
                      />
                      <UpdatingSelectInput
                        label="Страна"
                        name="newCountry"
                        placeholder="Введите страну"
                        type="text"
                        touch={{ setFieldTouched }}
                        valid={{ validateField }}
                        refFieldName={'newPostalCode'}
                        initValue={initialValues.newCountry}
                        setIsChangeFields={(name: string, value: boolean) => {
                          setIsChangeNewAddressForm({
                            ...isChangeNewAddressForm,
                            [name]: value,
                          });
                        }}
                        setValid={async (value) => {
                          if (!isChangeNewAddressForm.newPostalCode) {
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newCountry: true,
                            });
                            return;
                          }
                          try {
                            await newPostalCodeValidation.validate(
                              {
                                newCountry: value,
                                newPostalCode: values.newPostalCode,
                              },
                              { abortEarly: false }
                            );
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newPostalCode: true,
                              newCountry: true,
                            });
                          } catch (error) {
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newCountry: true,
                              newPostalCode: false,
                            });
                          }
                        }}
                        isChangeField={isChangeNewAddressForm.newCountry}
                      />

                      <UpdatingInput
                        label="Улица"
                        name="newStreetName"
                        placeholder="Введите улицу"
                        type="text"
                        touch={{ setFieldTouched }}
                        valid={{ validateField }}
                        initValue={initialValues.newStreetName}
                        setIsChangeFields={(name: string, value: boolean) => {
                          setIsChangeNewAddressForm({ ...isChangeNewAddressForm, [name]: value });
                        }}
                        setValid={async (value) => {
                          try {
                            await newStreetNameValidation.validate(
                              {
                                newStreetName: value,
                              },
                              { abortEarly: false }
                            );
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newStreetName: true,
                            });
                          } catch (error) {
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newStreetName: false,
                            });
                          }
                        }}
                        isChangeField={isChangeNewAddressForm.newStreetName}
                      />

                      <UpdatingInput
                        label="Индекс"
                        name="newPostalCode"
                        placeholder="Введите индекс"
                        type="text"
                        initValue={initialValues.newPostalCode}
                        setIsChangeFields={(name: string, value: boolean) => {
                          setIsChangeNewAddressForm({ ...isChangeNewAddressForm, [name]: value });
                        }}
                        setValid={async (value) => {
                          if (!isChangeNewAddressForm.newCountry) {
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newPostalCode: true,
                            });
                            return;
                          }
                          try {
                            await newPostalCodeValidation.validate(
                              {
                                newCountry: values.newCountry,
                                newPostalCode: value,
                              },
                              { abortEarly: false }
                            );
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newPostalCode: true,
                              newCountry: true,
                            });
                          } catch (error) {
                            setIsValidNewAddressFields({
                              ...isValidNewAddressFields,
                              newPostalCode: false,
                            });
                          }
                        }}
                        isChangeField={isChangeNewAddressForm.newPostalCode}
                      />

                      <label className="label-check">
                        <Field
                          type="checkbox"
                          name="isShippingAddress"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('isShippingAddress', e.target.checked, false);
                            setIsShippingAddress(e.target.checked);
                          }}
                        />
                        <span>Сделать адресом доставки</span>
                      </label>

                      <label className="label-check">
                        <Field
                          type="checkbox"
                          name="isBillingAddress"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('isBillingAddress', e.target.checked, false);
                            setIsBillingAddress(e.target.checked);
                          }}
                        />
                        <span>Сделать адресом оплаты</span>
                      </label>

                      <div className="button-wrapper">
                        <Button
                          className="button"
                          type="button"
                          onClick={async () => {
                            await addNewAddress(
                              {
                                city: values.newCity,
                                country: values.newCountry,
                                streetName: values.newStreetName,
                                postalCode: values.newPostalCode,
                              },
                              isShippingAddress,
                              isBillingAddress
                            );
                          }}
                          disabled={!isChangeNewAddress || !isValidNewAddress}
                        >
                          Добавить адрес
                        </Button>

                        <Button
                          className="button"
                          type="button"
                          onClick={() => {
                            setIsAddedAddressForm(false);
                            setIsChangeNewAddressForm({
                              newCity: false,
                              newCountry: false,
                              newStreetName: false,
                              newPostalCode: false,
                            });
                            setFieldValue('newCity', initialValues.newCity, false);
                            setFieldValue('newCountry', initialValues.newCountry, false);
                            setFieldValue('newStreetName', initialValues.newStreetName, false);
                            setFieldValue('newPostalCode', initialValues.newPostalCode, false);
                            setFieldValue('isShippingAddress', false, false);
                            setFieldValue('isBillingAddress', false, false);
                            if (isBillingAddress) setIsBillingAddress(false);
                            if (isShippingAddress) setIsShippingAddress(false);
                          }}
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  )}
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
                                  <div
                                    className={`address ${
                                      address.id === values.defaultShippingAddressId
                                        ? 'default'
                                        : ''
                                    }`}
                                    key={address.id}
                                  >
                                    <div className="button-wrapper">
                                      {!isUpdateAddressesForm.shippingAddresses[
                                        address.id || ''
                                      ] && (
                                        <Button
                                          className="button"
                                          type="button"
                                          onClick={() => {
                                            setIsUpdateAddressesForm({
                                              ...isUpdateAddressesForm,
                                              shippingAddresses: {
                                                ...isUpdateAddressesForm.shippingAddresses,
                                                [address.id || '']: true,
                                              },
                                            });
                                          }}
                                        >
                                          Редактировать этот адрес
                                        </Button>
                                      )}
                                      {!isUpdateAddressesForm.shippingAddresses[
                                        address.id || ''
                                      ] && (
                                        <Button
                                          className="button"
                                          type="button"
                                          onClick={async () => {
                                            await deleteAddress(address.id || '');
                                          }}
                                        >
                                          Удалить этот адрес
                                        </Button>
                                      )}

                                      {isUpdateAddressesForm.shippingAddresses[
                                        address.id || ''
                                      ] && (
                                        <Button
                                          className="button"
                                          type="button"
                                          onClick={async () => {
                                            await saveAddress(
                                              {
                                                ...address,
                                              },
                                              false,
                                              false,
                                              true
                                            );
                                          }}
                                          disabled={
                                            !isChangeAddress(
                                              'shippingAddresses',
                                              address.id || ''
                                            ) ||
                                            !isValidAddress('shippingAddresses', address.id || '')
                                          }
                                        >
                                          Сохранить
                                        </Button>
                                      )}
                                      {isUpdateAddressesForm.shippingAddresses[
                                        address.id || ''
                                      ] && (
                                        <Button
                                          className="button"
                                          type="button"
                                          onClick={() => {
                                            setIsUpdateAddressesForm({
                                              ...isUpdateAddressesForm,
                                              shippingAddresses: {
                                                ...isUpdateAddressesForm.shippingAddresses,
                                                [address.id || '']: false,
                                              },
                                            });
                                            resetChangeAddressesOfId(
                                              'shippingAddresses',
                                              address.id || ''
                                            );
                                            setFieldValue(
                                              `shippingAddresses.${index}.country`,
                                              initialValues.shippingAddresses[index]?.country,
                                              true
                                            );
                                            setFieldValue(
                                              `shippingAddresses.${index}.city`,
                                              initialValues.shippingAddresses[index]?.city,
                                              true
                                            );
                                            setFieldValue(
                                              `shippingAddresses.${index}.streetName`,
                                              initialValues.shippingAddresses[index]?.streetName,
                                              true
                                            );
                                            setFieldValue(
                                              `shippingAddresses.${index}.postalCode`,
                                              initialValues.shippingAddresses[index]?.postalCode,
                                              true
                                            );
                                          }}
                                        >
                                          Отменить
                                        </Button>
                                      )}
                                    </div>
                                    {address.id === values.defaultShippingAddressId && (
                                      <span>Адрес доставки по умолчанию</span>
                                    )}
                                    {address.id !== values.defaultShippingAddressId && (
                                      <label>
                                        <input
                                          type="checkbox"
                                          onChange={async (
                                            e: React.ChangeEvent<HTMLInputElement>
                                          ) => {
                                            if (e.target.checked) {
                                              await setDefaultAddress(address.id || '', 'shipping');
                                            }
                                          }}
                                        />
                                        <span>Установить как адрес доставки по умолчанию</span>
                                      </label>
                                    )}

                                    <UpdatingSelectField
                                      label="Страна"
                                      name={`shippingAddresses.${index}.country`}
                                      placeholder="Введите страну"
                                      type="text"
                                      touch={{ setFieldTouched }}
                                      valid={{ validateField }}
                                      refFieldName={`shippingAddresses.${index}.postalCode`}
                                      isUpdateForm={
                                        isUpdateAddressesForm.shippingAddresses[address.id || '']
                                      }
                                      initValue={initialValues.shippingAddresses[index]?.country}
                                      setIsChangeFields={(name: string, value: boolean) =>
                                        setIsChangeFieldOfShippingAddressesForm(
                                          address.id || '',
                                          name,
                                          value
                                        )
                                      }
                                      isChangeField={
                                        isChangeAddressesForm.shippingAddresses[address.id || '']
                                          .country
                                      }
                                      setValid={async (value) => {
                                        try {
                                          await updatingAddressValidationSchema.validate(
                                            {
                                              country: value,
                                              city: values.shippingAddresses[index]?.city,
                                              streetName:
                                                values.shippingAddresses[index]?.streetName,
                                              postalCode:
                                                values.shippingAddresses[index]?.postalCode,
                                            },
                                            { abortEarly: false }
                                          );
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                country: true,
                                                postalCode: true,
                                              },
                                            },
                                          });
                                        } catch (error) {
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                country: true,
                                                postalCode: false,
                                              },
                                            },
                                          });
                                        }
                                      }}
                                    />
                                    <UpdatingField
                                      label="Город"
                                      name={`shippingAddresses.${index}.city`}
                                      placeholder="Введите город"
                                      type="text"
                                      touch={{ setFieldTouched }}
                                      valid={{ validateField }}
                                      isUpdateForm={
                                        isUpdateAddressesForm.shippingAddresses[address.id || '']
                                      }
                                      initValue={initialValues.shippingAddresses[index]?.city}
                                      setIsChangeFields={(name: string, value: boolean) =>
                                        setIsChangeFieldOfShippingAddressesForm(
                                          address.id || '',
                                          name,
                                          value
                                        )
                                      }
                                      isChangeField={
                                        isChangeAddressesForm.shippingAddresses[address.id || '']
                                          .city
                                      }
                                      setValid={async (value) => {
                                        try {
                                          await updatingAddressValidationSchema.validate(
                                            {
                                              country: values.shippingAddresses[index]?.country,
                                              city: value,
                                              streetName:
                                                values.shippingAddresses[index]?.streetName,
                                              postalCode:
                                                values.shippingAddresses[index]?.postalCode,
                                            },
                                            { abortEarly: false }
                                          );
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                city: true,
                                              },
                                            },
                                          });
                                        } catch (error) {
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                city: false,
                                              },
                                            },
                                          });
                                        }
                                      }}
                                    />
                                    <UpdatingField
                                      label="Улица"
                                      name={`shippingAddresses.${index}.streetName`}
                                      placeholder="Введите улицу"
                                      type="text"
                                      touch={{ setFieldTouched }}
                                      valid={{ validateField }}
                                      isUpdateForm={
                                        isUpdateAddressesForm.shippingAddresses[address.id || '']
                                      }
                                      initValue={initialValues.shippingAddresses[index]?.streetName}
                                      setIsChangeFields={(name: string, value: boolean) =>
                                        setIsChangeFieldOfShippingAddressesForm(
                                          address.id || '',
                                          name,
                                          value
                                        )
                                      }
                                      isChangeField={
                                        isChangeAddressesForm.shippingAddresses[address.id || '']
                                          .streetName
                                      }
                                      setValid={async (value) => {
                                        try {
                                          await updatingAddressValidationSchema.validate(
                                            {
                                              country: values.shippingAddresses[index]?.country,
                                              city: values.shippingAddresses[index]?.city,
                                              streetName: value,
                                              postalCode:
                                                values.shippingAddresses[index]?.postalCode,
                                            },
                                            { abortEarly: false }
                                          );
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                streetName: true,
                                              },
                                            },
                                          });
                                        } catch (error) {
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                streetName: false,
                                              },
                                            },
                                          });
                                        }
                                      }}
                                    />
                                    <UpdatingField
                                      label="Индекс"
                                      name={`shippingAddresses.${index}.postalCode`}
                                      placeholder="Введите индекс"
                                      type="text"
                                      touch={{ setFieldTouched }}
                                      valid={{ validateField }}
                                      isUpdateForm={
                                        isUpdateAddressesForm.shippingAddresses[address.id || '']
                                      }
                                      initValue={initialValues.shippingAddresses[index]?.postalCode}
                                      setIsChangeFields={(name: string, value: boolean) =>
                                        setIsChangeFieldOfShippingAddressesForm(
                                          address.id || '',
                                          name,
                                          value
                                        )
                                      }
                                      isChangeField={
                                        isChangeAddressesForm.shippingAddresses[address.id || '']
                                          .postalCode
                                      }
                                      setValid={async (value) => {
                                        try {
                                          await updatingAddressValidationSchema.validate(
                                            {
                                              country: values.shippingAddresses[index]?.country,
                                              city: values.shippingAddresses[index]?.city,
                                              streetName:
                                                values.shippingAddresses[index]?.streetName,
                                              postalCode: value,
                                            },
                                            { abortEarly: false }
                                          );
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                postalCode: true,
                                              },
                                            },
                                          });
                                        } catch (error) {
                                          setIsValidAddressesFields({
                                            ...isValidAddressesFields,
                                            shippingAddresses: {
                                              ...isValidAddressesFields.shippingAddresses,
                                              [address.id || '']: {
                                                ...isValidAddressesFields.shippingAddresses[
                                                  address.id || ''
                                                ],
                                                postalCode: false,
                                              },
                                            },
                                          });
                                        }
                                      }}
                                    />
                                  </div>
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
                            values.billingAddresses.map((address, index) => {
                              return (
                                <div
                                  className={`address ${
                                    address.id === values.defaultBillingAddressId ? 'default' : ''
                                  }`}
                                  key={address.id}
                                >
                                  <div className="button-wrapper">
                                    {!isUpdateAddressesForm.billingAddresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={() => {
                                          setIsUpdateAddressesForm({
                                            ...isUpdateAddressesForm,
                                            billingAddresses: {
                                              ...isUpdateAddressesForm.billingAddresses,
                                              [address.id || '']: true,
                                            },
                                          });
                                        }}
                                      >
                                        Редактировать этот адрес
                                      </Button>
                                    )}
                                    {!isUpdateAddressesForm.billingAddresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={async () => {
                                          await deleteAddress(address.id || '');
                                        }}
                                      >
                                        Удалить этот адрес
                                      </Button>
                                    )}

                                    {isUpdateAddressesForm.billingAddresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={async () => {
                                          await saveAddress(
                                            {
                                              ...address,
                                            },
                                            false,
                                            false,
                                            true
                                          );
                                        }}
                                        disabled={
                                          !isChangeAddress('billingAddresses', address.id || '') ||
                                          !isValidAddress('billingAddresses', address.id || '')
                                        }
                                      >
                                        Сохранить
                                      </Button>
                                    )}
                                    {isUpdateAddressesForm.billingAddresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={() => {
                                          setIsUpdateAddressesForm({
                                            ...isUpdateAddressesForm,
                                            billingAddresses: {
                                              ...isUpdateAddressesForm.billingAddresses,
                                              [address.id || '']: false,
                                            },
                                          });
                                          resetChangeAddressesOfId(
                                            'billingAddresses',
                                            address.id || ''
                                          );
                                          setFieldValue(
                                            `billingAddresses.${index}.country`,
                                            initialValues.billingAddresses[index]?.country,
                                            true
                                          );
                                          setFieldValue(
                                            `billingAddresses.${index}.city`,
                                            initialValues.billingAddresses[index]?.city,
                                            true
                                          );
                                          setFieldValue(
                                            `billingAddresses.${index}.streetName`,
                                            initialValues.billingAddresses[index]?.streetName,
                                            true
                                          );
                                          setFieldValue(
                                            `billingAddresses.${index}.postalCode`,
                                            initialValues.billingAddresses[index]?.postalCode,
                                            true
                                          );
                                        }}
                                      >
                                        Отменить
                                      </Button>
                                    )}
                                  </div>
                                  {address.id === values.defaultBillingAddressId && (
                                    <span>Адрес оплаты по умолчанию</span>
                                  )}
                                  {address.id !== values.defaultBillingAddressId && (
                                    <label>
                                      <input
                                        type="checkbox"
                                        onChange={async (
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          if (e.target.checked) {
                                            await setDefaultAddress(address.id || '', 'billing');
                                          }
                                        }}
                                      />
                                      <span>Установить как адрес оплаты по умолчанию</span>
                                    </label>
                                  )}

                                  <UpdatingSelectField
                                    label="Страна"
                                    name={`billingAddresses.${index}.country`}
                                    placeholder="Введите страну"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    refFieldName={`billingAddresses.${index}.postalCode`}
                                    isUpdateForm={
                                      isUpdateAddressesForm.billingAddresses[address.id || '']
                                    }
                                    initValue={initialValues.billingAddresses[index]?.country}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfBillingAddressesForm(
                                        address.id || '',
                                        name,
                                        value
                                      )
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.billingAddresses[address.id || '']
                                        .country
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: value,
                                            city: values.billingAddresses[index]?.city,
                                            streetName: values.billingAddresses[index]?.streetName,
                                            postalCode: values.billingAddresses[index]?.postalCode,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              country: true,
                                              postalCode: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              country: true,
                                              postalCode: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                  <UpdatingField
                                    label="Город"
                                    name={`billingAddresses.${index}.city`}
                                    placeholder="Введите город"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    isUpdateForm={
                                      isUpdateAddressesForm.billingAddresses[address.id || '']
                                    }
                                    initValue={initialValues.billingAddresses[index]?.city}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfBillingAddressesForm(
                                        address.id || '',
                                        name,
                                        value
                                      )
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.billingAddresses[address.id || ''].city
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: values.billingAddresses[index]?.country,
                                            city: value,
                                            streetName: values.billingAddresses[index]?.streetName,
                                            postalCode: values.billingAddresses[index]?.postalCode,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              city: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields((prev) => ({
                                          ...prev,
                                          billingAddresses: {
                                            ...prev.billingAddresses,
                                            [address.id || '']: {
                                              ...prev.billingAddresses[address.id || ''],
                                              city: false,
                                            },
                                          },
                                        }));
                                      }
                                    }}
                                  />
                                  <UpdatingField
                                    label="Улица"
                                    name={`billingAddresses.${index}.streetName`}
                                    placeholder="Введите улицу"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    isUpdateForm={
                                      isUpdateAddressesForm.billingAddresses[address.id || '']
                                    }
                                    initValue={initialValues.billingAddresses[index]?.streetName}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfBillingAddressesForm(
                                        address.id || '',
                                        name,
                                        value
                                      )
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.billingAddresses[address.id || '']
                                        .streetName
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: values.billingAddresses[index]?.country,
                                            city: values.billingAddresses[index]?.city,
                                            streetName: value,
                                            postalCode: values.billingAddresses[index]?.postalCode,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              streetName: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              streetName: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                  <UpdatingField
                                    label="Индекс"
                                    name={`billingAddresses.${index}.postalCode`}
                                    placeholder="Введите индекс"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    isUpdateForm={
                                      isUpdateAddressesForm.billingAddresses[address.id || '']
                                    }
                                    initValue={initialValues.billingAddresses[index]?.postalCode}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfBillingAddressesForm(
                                        address.id || '',
                                        name,
                                        value
                                      )
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.billingAddresses[address.id || '']
                                        .postalCode
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: values.billingAddresses[index]?.country,
                                            city: values.billingAddresses[index]?.city,
                                            streetName: values.billingAddresses[index]?.streetName,
                                            postalCode: value,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              postalCode: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          billingAddresses: {
                                            ...isValidAddressesFields.billingAddresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.billingAddresses[
                                                address.id || ''
                                              ],
                                              postalCode: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
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
                                    {!isUpdateAddressesForm.addresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={() => {
                                          setIsUpdateAddressesForm({
                                            ...isUpdateAddressesForm,
                                            addresses: {
                                              ...isUpdateAddressesForm.addresses,
                                              [address.id || '']: true,
                                            },
                                          });
                                        }}
                                      >
                                        Редактировать этот адрес
                                      </Button>
                                    )}
                                    {!isUpdateAddressesForm.addresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={async () => {
                                          await deleteAddress(address.id || '');
                                          if (
                                            address.id &&
                                            isCheckAsBillingAddress.includes(address.id)
                                          ) {
                                            setIsCheckAsBillingAddress([
                                              ...isCheckAsBillingAddress.filter(
                                                (id) => id !== address.id
                                              ),
                                            ]);
                                          }
                                          if (
                                            address.id &&
                                            isCheckAsShippingAddress.includes(address.id)
                                          ) {
                                            setIsCheckAsShippingAddress([
                                              ...isCheckAsShippingAddress.filter(
                                                (id) => id !== address.id
                                              ),
                                            ]);
                                          }
                                        }}
                                      >
                                        Удалить этот адрес
                                      </Button>
                                    )}

                                    {isUpdateAddressesForm.addresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={async () => {
                                          await saveAddress(
                                            { ...address },
                                            !!address.id &&
                                              isCheckAsShippingAddress.includes(address.id),
                                            !!address.id &&
                                              isCheckAsBillingAddress.includes(address.id),
                                            !!address.id && isChangeAddress('addresses', address.id)
                                          );
                                        }}
                                        disabled={
                                          !(
                                            (address.id &&
                                              isCheckAsShippingAddress.includes(address.id)) ||
                                            (address.id &&
                                              isCheckAsBillingAddress.includes(address.id)) ||
                                            isChangeAddress('addresses', address.id || '')
                                          ) || !isValidAddress('addresses', address.id || '')
                                        }
                                      >
                                        Сохранить
                                      </Button>
                                    )}
                                    {isUpdateAddressesForm.addresses[address.id || ''] && (
                                      <Button
                                        className="button"
                                        type="button"
                                        onClick={() => {
                                          setIsUpdateAddressesForm({
                                            ...isUpdateAddressesForm,
                                            addresses: {
                                              ...isUpdateAddressesForm.addresses,
                                              [address.id || '']: false,
                                            },
                                          });
                                          resetChangeAddressesOfId('addresses', address.id || '');
                                          setFieldValue(
                                            `addresses.${index}.country`,
                                            initialValues.addresses[index]?.country,
                                            true
                                          );
                                          setFieldValue(
                                            `addresses.${index}.city`,
                                            initialValues.addresses[index]?.city,
                                            true
                                          );
                                          setFieldValue(
                                            `addresses.${index}.streetName`,
                                            initialValues.addresses[index]?.streetName,
                                            true
                                          );
                                          setFieldValue(
                                            `addresses.${index}.postalCode`,
                                            initialValues.addresses[index]?.postalCode,
                                            true
                                          );
                                          if (
                                            address.id &&
                                            isCheckAsBillingAddress.includes(address.id)
                                          ) {
                                            setIsCheckAsBillingAddress([
                                              ...isCheckAsBillingAddress.filter(
                                                (id) => id !== address.id
                                              ),
                                            ]);
                                          }
                                          if (
                                            address.id &&
                                            isCheckAsShippingAddress.includes(address.id)
                                          ) {
                                            setIsCheckAsShippingAddress([
                                              ...isCheckAsShippingAddress.filter(
                                                (id) => id !== address.id
                                              ),
                                            ]);
                                          }
                                        }}
                                      >
                                        Отменить
                                      </Button>
                                    )}
                                  </div>

                                  {isUpdateAddressesForm.addresses[address.id || ''] && (
                                    <div>
                                      <label className="label-check">
                                        <input
                                          type="checkbox"
                                          onChange={() => {
                                            if (
                                              address.id &&
                                              !isCheckAsShippingAddress.includes(address.id)
                                            ) {
                                              setIsCheckAsShippingAddress([
                                                ...isCheckAsShippingAddress,
                                                address.id,
                                              ]);
                                            } else {
                                              setIsCheckAsShippingAddress([
                                                ...isCheckAsShippingAddress.filter(
                                                  (item) => item !== address.id
                                                ),
                                              ]);
                                            }
                                          }}
                                          checked={
                                            !!address.id &&
                                            isCheckAsShippingAddress.includes(address.id)
                                          }
                                        />
                                        <span>Сделать адресом доставки</span>
                                      </label>

                                      <label className="label-check">
                                        <input
                                          type="checkbox"
                                          onChange={() => {
                                            if (
                                              address.id &&
                                              !isCheckAsBillingAddress.includes(address.id)
                                            ) {
                                              setIsCheckAsBillingAddress([
                                                ...isCheckAsBillingAddress,
                                                address.id,
                                              ]);
                                            } else {
                                              setIsCheckAsBillingAddress([
                                                ...isCheckAsBillingAddress.filter(
                                                  (item) => item !== address.id
                                                ),
                                              ]);
                                            }
                                          }}
                                          checked={
                                            !!address.id &&
                                            isCheckAsBillingAddress.includes(address.id)
                                          }
                                        />
                                        <span>Сделать адресом оплаты</span>
                                      </label>
                                    </div>
                                  )}

                                  <UpdatingSelectField
                                    label="Страна"
                                    name={`addresses.${index}.country`}
                                    placeholder="Введите страну"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    refFieldName={`addresses.${index}.country`}
                                    isUpdateForm={isUpdateAddressesForm.addresses[address.id || '']}
                                    initValue={initialValues.addresses[index]?.country}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfAddressesForm(address.id || '', name, value)
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.addresses[address.id || ''].country
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: value,
                                            city: values.addresses[index]?.city,
                                            streetName: values.addresses[index]?.streetName,
                                            postalCode: values.addresses[index]?.postalCode,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              country: true,
                                              postalCode: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              country: true,
                                              postalCode: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                  <UpdatingField
                                    label="Город"
                                    name={`addresses.${index}.city`}
                                    placeholder="Введите город"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    isUpdateForm={isUpdateAddressesForm.addresses[address.id || '']}
                                    initValue={initialValues.addresses[index]?.city}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfAddressesForm(address.id || '', name, value)
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.addresses[address.id || ''].city
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: values.addresses[index]?.country,
                                            city: value,
                                            streetName: values.addresses[index]?.streetName,
                                            postalCode: values.addresses[index]?.postalCode,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              city: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              city: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                  <UpdatingField
                                    label="Улица"
                                    name={`addresses.${index}.streetName`}
                                    placeholder="Введите улицу"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    isUpdateForm={isUpdateAddressesForm.addresses[address.id || '']}
                                    initValue={initialValues.addresses[index]?.streetName}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfAddressesForm(address.id || '', name, value)
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.addresses[address.id || ''].streetName
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: values.addresses[index]?.country,
                                            city: values.addresses[index]?.city,
                                            streetName: value,
                                            postalCode: values.addresses[index]?.postalCode,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              streetName: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              streetName: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                  <UpdatingField
                                    label="Индекс"
                                    name={`addresses.${index}.postalCode`}
                                    placeholder="Введите индекс"
                                    type="text"
                                    touch={{ setFieldTouched }}
                                    valid={{ validateField }}
                                    isUpdateForm={isUpdateAddressesForm.addresses[address.id || '']}
                                    initValue={initialValues.addresses[index]?.postalCode}
                                    setIsChangeFields={(name: string, value: boolean) =>
                                      setIsChangeFieldOfAddressesForm(address.id || '', name, value)
                                    }
                                    isChangeField={
                                      isChangeAddressesForm.addresses[address.id || ''].postalCode
                                    }
                                    setValid={async (value) => {
                                      try {
                                        await updatingAddressValidationSchema.validate(
                                          {
                                            country: values.addresses[index]?.country,
                                            city: values.addresses[index]?.city,
                                            streetName: values.addresses[index]?.streetName,
                                            postalCode: value,
                                          },
                                          { abortEarly: false }
                                        );
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              postalCode: true,
                                            },
                                          },
                                        });
                                      } catch (error) {
                                        setIsValidAddressesFields({
                                          ...isValidAddressesFields,
                                          addresses: {
                                            ...isValidAddressesFields.addresses,
                                            [address.id || '']: {
                                              ...isValidAddressesFields.addresses[address.id || ''],
                                              postalCode: false,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                </div>
                              ))}
                          </>
                        )}
                      />
                    </div>
                  )}
                  {/* <div className="button-wrapp">
                    {!isUpdateAddresForm &&
                      ((values.shippingAddresses && values.shippingAddresses.length > 0) ||
                        (values.billingAddresses && values.billingAddresses.length > 0) ||
                        (values.addresses && values.addresses.length > 0)) && (
                        <Button
                          className="button"
                          type="button"
                          onClick={() => {
                            setIsUpdateAddressesForm(updatingAddressObject(getAllAddressIds()));
                          }}
                        >
                          Редактировать адреса
                        </Button>
                      )}

                    {isUpdateAddresForm && (
                      <Button
                        className="button"
                        type="button"
                        onClick={async () => {
                          await saveAddresses([
                            ...Object.values<Address>(values.shippingAddresses).filter((address) =>
                              isChangeAddress('shippingAddresses', address.id || '')
                            ),
                            ...Object.values<Address>(values.billingAddresses).filter((address) =>
                              isChangeAddress('billingAddresses', address.id || '')
                            ),
                            ...Object.values<Address>(values.addresses).filter((address) =>
                              isChangeAddress('addresses', address.id || '')
                            ),
                          ]);
                        }}
                        disabled={!isChangeAddresses || !isValidAddresses}
                      >
                        Сохранить все изменения
                      </Button>
                    )}
                    {isUpdateAddresForm && (
                      <Button
                        className="button"
                        type="button"
                        onClick={() => {
                          setIsUpdateAddressesForm(updatingAddressObject({}));
                          setIsChangeAddressesForm(initialAddressesObject());
                          setValues(initialValues, false);
                        }}
                      >
                        Отменить все изменения
                      </Button>
                    )}
                  </div> */}
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
                    isUpdateForm={isUpdateUserSettingsForm.email}
                    setIsUpdateFields={setIsUpdateFieldsOfUserSettingsForm}
                    initValue={initialValues.email}
                    setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                    setFieldValue={setFieldValue}
                    isChangeField={isChangeUserSettingsForm.email}
                    onSave={async () => {
                      await savePersonalData('email', { email: values.email });
                    }}
                  />

                  {!isUpdateUserSettingsForm.password && (
                    <>
                      <Button
                        className="button"
                        type="button"
                        onClick={() => {
                          setIsUpdateUserSettingsForm({
                            ...isUpdateUserSettingsForm,
                            password: true,
                            passwordNew: true,
                            passwordConfirm: true,
                          });
                        }}
                      >
                        Изменить пароль
                      </Button>
                    </>
                  )}
                  {isUpdateUserSettingsForm.password && (
                    <>
                      <h3>Изменение пароля</h3>
                      <UpdatingField
                        label="Введите текущий пароль"
                        name="password"
                        placeholder="Введите текущий пароль"
                        type="password"
                        touch={{ setFieldTouched }}
                        valid={{ validateField }}
                        setValid={async (value) => {
                          try {
                            await updatingPasswordValidationSchema.validate(
                              {
                                password: value,
                                passwordNew: values.passwordNew,
                                passwordConfirm: values.passwordConfirm,
                              },
                              { abortEarly: false }
                            );
                            setIsValidPasswordFields({
                              ...isValidPasswordFields,
                              password: true,
                              passwordNew: true,
                              passwordConfirm: true,
                            });
                          } catch (error) {
                            setIsValidPasswordFields({
                              ...isValidPasswordFields,
                              password: false,
                            });
                          }
                        }}
                        isUpdateForm={isUpdateUserSettingsForm.password}
                        initValue={initialValues.password}
                        setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                        setFieldValue={setFieldValue}
                        isChangeField={isChangeUserSettingsForm.password}
                      />
                      <UpdatingField
                        label="Введите новый пароль"
                        name="passwordNew"
                        placeholder="Введите новый пароль"
                        type="password"
                        touch={{ setFieldTouched }}
                        valid={{ validateField }}
                        setValid={async (value) => {
                          try {
                            await updatingPasswordValidationSchema.validate(
                              {
                                password: values.password,
                                passwordNew: value,
                                passwordConfirm: values.passwordConfirm,
                              },
                              { abortEarly: false }
                            );
                            setIsValidPasswordFields({
                              ...isValidPasswordFields,
                              password: true,
                              passwordNew: true,
                              passwordConfirm: true,
                            });
                          } catch (error) {
                            setIsValidPasswordFields({
                              ...isValidPasswordFields,
                              passwordNew: false,
                            });
                          }
                        }}
                        isUpdateForm={isUpdateUserSettingsForm.passwordNew}
                        initValue={initialValues.passwordNew}
                        setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                        setFieldValue={setFieldValue}
                        isChangeField={isChangeUserSettingsForm.passwordNew}
                      />
                      <UpdatingField
                        label="Подтвердите новый пароль"
                        name="passwordConfirm"
                        placeholder="Подтвердите новый пароль"
                        type="password"
                        touch={{ setFieldTouched }}
                        valid={{ validateField }}
                        setValid={async (value) => {
                          try {
                            await updatingPasswordValidationSchema.validate(
                              {
                                password: values.password,
                                passwordNew: values.passwordNew,
                                passwordConfirm: value,
                              },
                              { abortEarly: false }
                            );
                            setIsValidPasswordFields({
                              ...isValidPasswordFields,
                              password: true,
                              passwordNew: true,
                              passwordConfirm: true,
                            });
                          } catch (error) {
                            setIsValidPasswordFields({
                              ...isValidPasswordFields,
                              passwordConfirm: false,
                            });
                          }
                        }}
                        isUpdateForm={isUpdateUserSettingsForm.passwordConfirm}
                        initValue={initialValues.passwordConfirm}
                        setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                        setFieldValue={setFieldValue}
                        isChangeField={isChangeUserSettingsForm.passwordConfirm}
                      />
                      <div className="button-wrapper">
                        <Button
                          className="button"
                          type="button"
                          onClick={async () => {
                            if (isChangePasswords && isValidPasswords) {
                              await savePassword({
                                password: values.password,
                                passwordNew: values.passwordNew,
                              });
                            }
                          }}
                          disabled={!isValidPasswords || !isChangePasswords}
                        >
                          Сохранить пароль
                        </Button>
                        <Button
                          className="button"
                          type="button"
                          onClick={() => {
                            setIsUpdateUserSettingsForm({
                              ...isUpdateUserSettingsForm,
                              password: false,
                              passwordNew: false,
                              passwordConfirm: false,
                            });
                            setIsChangeUserSettingsForm({
                              ...isChangeUserSettingsForm,
                              password: false,
                              passwordNew: false,
                              passwordConfirm: false,
                            });
                            setIsValidPasswordFields({
                              password: true,
                              passwordNew: true,
                              passwordConfirm: true,
                            });
                            setFieldValue('password', initialValues.password, false);
                            setFieldValue('passwordNew', initialValues.passwordNew, false);
                            setFieldValue('passwordConfirm', initialValues.passwordConfirm, false);
                          }}
                        >
                          Отмена
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export { UpdatingForm };
