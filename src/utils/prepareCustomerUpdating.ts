import { Customer, CustomerUpdating } from '../types';

const prepareCustomerUpdating = (customer: Customer, bearerToken: string): CustomerUpdating => {
  const {
    id,
    version,
    email,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    shippingAddressIds,
    billingAddressIds,
    defaultShippingAddressId,
    defaultBillingAddressId,
  } = customer;

  const shippingAddresses = addresses
    .filter((address) => shippingAddressIds.includes(address.id || ''))
    .map((address) => ({ ...address }));

  const billingAddresses = addresses
    .filter((address) => billingAddressIds.includes(address.id || ''))
    .map((address) => ({ ...address }));

  const restAddresses = addresses
    .filter(
      (address) =>
        !shippingAddressIds.includes(address.id || '') &&
        !billingAddressIds.includes(address.id || '')
    )
    .map((address) => ({ ...address }));

  return {
    id,
    version,
    email,
    firstName,
    lastName,
    dateOfBirth,
    addresses: restAddresses,
    shippingAddresses,
    billingAddresses,
    defaultShippingAddressId,
    defaultBillingAddressId,
    bearerToken,
  };
};

export { prepareCustomerUpdating };
