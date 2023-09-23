import { useState, useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from './Button';
import { Address, AddAddressesInitialValues } from '../types';
import {
  newCityValidation,
  newPostalCodeValidation,
  newStreetNameValidation,
  updatingValidationSchema,
} from '../utils/updatingValidation';
import { addAddress, addSpecialAddress } from '../services/commercetoolsApi';
import { Context } from '../store/Context';
import 'react-toastify/dist/ReactToastify.css';
import { UpdatingInput } from './UpdatingInput';
import { UpdatingSelectInput } from './UpdatingSelectInput';

const AddAddressesForm = observer(({ cb }: { cb: () => void }) => {
  const { user } = useContext(Context);

  if (!user || user.user === null || user.user.user === null) {
    return null;
  }

  const [initialValues, setInitialValues] = useState<AddAddressesInitialValues>({
    newCity: '',
    newCountry: '',
    newPostalCode: '',
    newStreetName: '',
    isShippingAddress: false,
    isBillingAddress: false,
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

  const [isAddedAddressForm, setIsAddedAddressForm] = useState(false);

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
          newCity: '',
          newCountry: '',
          newPostalCode: '',
          newStreetName: '',
          isShippingAddress: false,
          isBillingAddress: false,
        });
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
      cb();
    } catch (error) {
      toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
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
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={updatingValidationSchema}
        enableReinitialize={true}
      >
        {({ values, setFieldTouched, validateField, setFieldValue, setValues, setTouched }) => {
          return (
            <Form>
              <>
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
                          setValues({
                            newCity: '',
                            newCountry: '',
                            newStreetName: '',
                            newPostalCode: '',
                            isShippingAddress: false,
                            isBillingAddress: false,
                          });
                          setTouched({
                            newCity: false,
                            newCountry: false,
                            newStreetName: false,
                            newPostalCode: false,
                            isShippingAddress: false,
                            isBillingAddress: false,
                          });
                          setIsAddedAddressForm(false);
                          setIsChangeNewAddressForm({
                            newCity: false,
                            newCountry: false,
                            newStreetName: false,
                            newPostalCode: false,
                          });
                          if (isBillingAddress) setIsBillingAddress(false);
                          if (isShippingAddress) setIsShippingAddress(false);
                        }}
                        disabled={!isChangeNewAddress || !isValidNewAddress}
                      >
                        Добавить адрес
                      </Button>

                      <Button
                        className="button"
                        type="button"
                        onClick={() => {
                          setValues({
                            newCity: '',
                            newCountry: '',
                            newStreetName: '',
                            newPostalCode: '',
                            isShippingAddress: false,
                            isBillingAddress: false,
                          });
                          setTouched({
                            newCity: false,
                            newCountry: false,
                            newStreetName: false,
                            newPostalCode: false,
                            isShippingAddress: false,
                            isBillingAddress: false,
                          });
                          setIsAddedAddressForm(false);
                          setIsChangeNewAddressForm({
                            newCity: false,
                            newCountry: false,
                            newStreetName: false,
                            newPostalCode: false,
                          });
                          if (isBillingAddress) setIsBillingAddress(false);
                          if (isShippingAddress) setIsShippingAddress(false);
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
              </>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </>
  );
});

export { AddAddressesForm };
