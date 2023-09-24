import { observer } from 'mobx-react-lite';
import 'react-toastify/dist/ReactToastify.css';
import { Address, UpdatingAddressesInitialValues } from '../types';
import { Button } from './Button';
import { UpdatingSelectField } from './UpdatingSelectField';
import { updatingAddressValidationSchema } from '../utils/updatingValidation';
import { UpdatingField } from './UpdatingField';

const UpdatingAddressForm = observer(
  ({
    addressType,
    initialValues,
    values,
    address,
    index,
    isUpdateAddressesForm,
    setIsUpdateAddressesForm,
    deleteAddress,
    saveAddress,
    isChangeAddress,
    isValidAddress,
    resetChangeAddressesOfId,
    setFieldValue,
    setDefaultAddress,
    setFieldTouched,
    validateField,
    setIsChangeFieldOfShippingAddressesForm,
    setIsChangeFieldOfBillingAddressesForm,
    setIsChangeFieldOfAddressesForm,
    isChangeAddressesForm,
    isValidAddressesFields,
    setIsValidAddressesFields,
    isCheckAsShippingAddress,
    setIsCheckAsShippingAddress,
    isCheckAsBillingAddress,
    setIsCheckAsBillingAddress,
  }: {
    addressType: 'shippingAddresses' | 'billingAddresses' | 'addresses';
    initialValues: UpdatingAddressesInitialValues;
    values: UpdatingAddressesInitialValues;
    address: Address;
    index: number;
    isUpdateAddressesForm: { [key: string]: { [key: string]: boolean } };
    setIsUpdateAddressesForm: (a: { [key: string]: { [key: string]: boolean } }) => void;
    deleteAddress: (addressId: string) => Promise<void>;
    saveAddress: (
      address: Address,
      isShipping: boolean,
      isBilling: boolean,
      isChanged: boolean
    ) => Promise<void>;
    isChangeAddress: (type: string, id: string) => boolean;
    isValidAddress: (type: string, id: string) => boolean;
    resetChangeAddressesOfId: (type: string, id: string) => void;
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
    setDefaultAddress: (addressId: string, type: string) => Promise<void>;
    setFieldTouched: (field: string, isTouched?: boolean | undefined) => void;
    validateField: (field: string, isValid?: boolean | undefined) => void;
    setIsChangeFieldOfShippingAddressesForm: (id: string, name: string, value: boolean) => void;
    setIsChangeFieldOfBillingAddressesForm: (id: string, name: string, value: boolean) => void;
    setIsChangeFieldOfAddressesForm: (id: string, name: string, value: boolean) => void;
    isChangeAddressesForm: {
      [key: string]: { [key: string]: { [key: string]: boolean } };
    };
    isValidAddressesFields: {
      [key: string]: {
        [key: string]: {
          [key: string]: boolean;
        };
      };
    };
    setIsValidAddressesFields: (a: {
      [key: string]: { [key: string]: { [key: string]: boolean } };
    }) => void;
    isCheckAsShippingAddress: string[];
    setIsCheckAsShippingAddress: (arr: string[]) => void;
    isCheckAsBillingAddress: string[];
    setIsCheckAsBillingAddress: (arr: string[]) => void;
  }) => {
    const isDefault =
      address.id ===
      (addressType === 'shippingAddresses'
        ? values.defaultShippingAddressId
        : values.defaultBillingAddressId)
        ? 'default'
        : '';
    return (
      <div className={`address ${isDefault}`} key={address.id}>
        <div className="button-wrapper">
          {!isUpdateAddressesForm[addressType][address.id || ''] && (
            <Button
              className="button"
              type="button"
              onClick={() => {
                setIsUpdateAddressesForm({
                  ...isUpdateAddressesForm,
                  [`${addressType}`]: {
                    ...isUpdateAddressesForm[addressType],
                    [address.id || '']: true,
                  },
                });
              }}
            >
              Редактировать этот адрес
            </Button>
          )}
          {!isUpdateAddressesForm[addressType][address.id || ''] && (
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

          {isUpdateAddressesForm[addressType][address.id || ''] && (
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
                !isChangeAddress(addressType, address.id || '') ||
                !isValidAddress(addressType, address.id || '')
              }
            >
              Сохранить
            </Button>
          )}
          {isUpdateAddressesForm[addressType][address.id || ''] && (
            <Button
              className="button"
              type="button"
              onClick={() => {
                setIsUpdateAddressesForm({
                  ...isUpdateAddressesForm,
                  [`${addressType}`]: {
                    ...isUpdateAddressesForm[addressType],
                    [address.id || '']: false,
                  },
                });
                resetChangeAddressesOfId(addressType, address.id || '');
                setFieldValue(
                  `${addressType}.${index}.country`,
                  initialValues[addressType][index]?.country,
                  true
                );
                setFieldValue(
                  `${addressType}.${index}.city`,
                  initialValues[addressType][index]?.city,
                  true
                );
                setFieldValue(
                  `${addressType}.${index}.streetName`,
                  initialValues[addressType][index]?.streetName,
                  true
                );
                setFieldValue(
                  `${addressType}.${index}.postalCode`,
                  initialValues[addressType][index]?.postalCode,
                  true
                );
              }}
            >
              Отменить
            </Button>
          )}
        </div>
        {address.id ===
          (addressType === 'shippingAddresses'
            ? values.defaultShippingAddressId
            : values.defaultBillingAddressId) && <span>Адрес доставки по умолчанию</span>}
        {address.id !==
          (addressType === 'shippingAddresses'
            ? values.defaultShippingAddressId
            : values.defaultBillingAddressId) && (
          <label>
            <input
              type="checkbox"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  await setDefaultAddress(
                    address.id || '',
                    addressType === 'shippingAddresses' ? 'shipping' : 'billing'
                  );
                }
              }}
            />
            <span>Установить как адрес доставки по умолчанию</span>
          </label>
        )}

        {addressType === 'addresses' && isUpdateAddressesForm.addresses[address.id || ''] && (
          <div>
            <label className="label-check">
              <input
                type="checkbox"
                onChange={() => {
                  if (address.id && !isCheckAsShippingAddress.includes(address.id)) {
                    setIsCheckAsShippingAddress([...isCheckAsShippingAddress, address.id]);
                  } else {
                    setIsCheckAsShippingAddress([
                      ...isCheckAsShippingAddress.filter((item) => item !== address.id),
                    ]);
                  }
                }}
                checked={!!address.id && isCheckAsShippingAddress.includes(address.id)}
              />
              <span>Сделать адресом доставки</span>
            </label>

            <label className="label-check">
              <input
                type="checkbox"
                onChange={() => {
                  if (address.id && !isCheckAsBillingAddress.includes(address.id)) {
                    setIsCheckAsBillingAddress([...isCheckAsBillingAddress, address.id]);
                  } else {
                    setIsCheckAsBillingAddress([
                      ...isCheckAsBillingAddress.filter((item) => item !== address.id),
                    ]);
                  }
                }}
                checked={!!address.id && isCheckAsBillingAddress.includes(address.id)}
              />
              <span>Сделать адресом оплаты</span>
            </label>
          </div>
        )}

        <UpdatingSelectField
          label="Страна"
          name={`${addressType}.${index}.country`}
          placeholder="Введите страну"
          type="text"
          touch={{ setFieldTouched }}
          valid={{ validateField }}
          refFieldName={`${addressType}.${index}.postalCode`}
          isUpdateForm={isUpdateAddressesForm[addressType][address.id || '']}
          initValue={initialValues[addressType][index]?.country}
          setIsChangeFields={(name: string, value: boolean) => {
            if (addressType === 'shippingAddresses') {
              setIsChangeFieldOfShippingAddressesForm(address.id || '', name, value);
            } else if (addressType === 'billingAddresses') {
              setIsChangeFieldOfBillingAddressesForm(address.id || '', name, value);
            } else {
              setIsChangeFieldOfAddressesForm(address.id || '', name, value);
            }
          }}
          isChangeField={isChangeAddressesForm[addressType][address.id || ''].country}
          setValid={async (value) => {
            try {
              await updatingAddressValidationSchema.validate(
                {
                  country: value,
                  city: values[addressType][index]?.city,
                  streetName: values[addressType][index]?.streetName,
                  postalCode: values[addressType][index]?.postalCode,
                },
                { abortEarly: false }
              );
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    country: true,
                    postalCode: true,
                  },
                },
              });
            } catch (error) {
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
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
          name={`${addressType}.${index}.city`}
          placeholder="Введите город"
          type="text"
          touch={{ setFieldTouched }}
          valid={{ validateField }}
          isUpdateForm={isUpdateAddressesForm[addressType][address.id || '']}
          initValue={initialValues[addressType][index]?.city}
          setIsChangeFields={(name: string, value: boolean) => {
            if (addressType === 'shippingAddresses') {
              setIsChangeFieldOfShippingAddressesForm(address.id || '', name, value);
            } else if (addressType === 'billingAddresses') {
              setIsChangeFieldOfBillingAddressesForm(address.id || '', name, value);
            } else {
              setIsChangeFieldOfAddressesForm(address.id || '', name, value);
            }
          }}
          isChangeField={isChangeAddressesForm[addressType][address.id || ''].city}
          setValid={async (value) => {
            try {
              await updatingAddressValidationSchema.validate(
                {
                  country: values[addressType][index]?.country,
                  city: value,
                  streetName: values[addressType][index]?.streetName,
                  postalCode: values[addressType][index]?.postalCode,
                },
                { abortEarly: false }
              );
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    city: true,
                  },
                },
              });
            } catch (error) {
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    city: false,
                  },
                },
              });
            }
          }}
        />
        <UpdatingField
          label="Улица"
          name={`${addressType}.${index}.streetName`}
          placeholder="Введите улицу"
          type="text"
          touch={{ setFieldTouched }}
          valid={{ validateField }}
          isUpdateForm={isUpdateAddressesForm[addressType][address.id || '']}
          initValue={initialValues[addressType][index]?.streetName}
          setIsChangeFields={(name: string, value: boolean) => {
            if (addressType === 'shippingAddresses') {
              setIsChangeFieldOfShippingAddressesForm(address.id || '', name, value);
            } else if (addressType === 'billingAddresses') {
              setIsChangeFieldOfBillingAddressesForm(address.id || '', name, value);
            } else {
              setIsChangeFieldOfAddressesForm(address.id || '', name, value);
            }
          }}
          isChangeField={isChangeAddressesForm[addressType][address.id || ''].streetName}
          setValid={async (value) => {
            try {
              await updatingAddressValidationSchema.validate(
                {
                  country: values[addressType][index]?.country,
                  city: values[addressType][index]?.city,
                  streetName: value,
                  postalCode: values[addressType][index]?.postalCode,
                },
                { abortEarly: false }
              );
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    streetName: true,
                  },
                },
              });
            } catch (error) {
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    streetName: false,
                  },
                },
              });
            }
          }}
        />
        <UpdatingField
          label="Индекс"
          name={`${addressType}.${index}.postalCode`}
          placeholder="Введите индекс"
          type="text"
          touch={{ setFieldTouched }}
          valid={{ validateField }}
          isUpdateForm={isUpdateAddressesForm[addressType][address.id || '']}
          initValue={initialValues[addressType][index]?.postalCode}
          setIsChangeFields={(name: string, value: boolean) => {
            if (addressType === 'shippingAddresses') {
              setIsChangeFieldOfShippingAddressesForm(address.id || '', name, value);
            } else if (addressType === 'billingAddresses') {
              setIsChangeFieldOfBillingAddressesForm(address.id || '', name, value);
            } else {
              setIsChangeFieldOfAddressesForm(address.id || '', name, value);
            }
          }}
          isChangeField={isChangeAddressesForm[addressType][address.id || ''].postalCode}
          setValid={async (value) => {
            try {
              await updatingAddressValidationSchema.validate(
                {
                  country: values[addressType][index]?.country,
                  city: values[addressType][index]?.city,
                  streetName: values[addressType][index]?.streetName,
                  postalCode: value,
                },
                { abortEarly: false }
              );
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    postalCode: true,
                  },
                },
              });
            } catch (error) {
              setIsValidAddressesFields({
                ...isValidAddressesFields,
                [`${addressType}`]: {
                  ...isValidAddressesFields[addressType],
                  [address.id || '']: {
                    ...isValidAddressesFields[addressType][address.id || ''],
                    postalCode: false,
                  },
                },
              });
            }
          }}
        />
      </div>
    );
  }
);

export { UpdatingAddressForm };
