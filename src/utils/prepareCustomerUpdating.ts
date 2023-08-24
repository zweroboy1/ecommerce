import { Customer, CustomerUpdating } from '../types';

const prepareCustomerUpdating = (customer: Customer): CustomerUpdating => {
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

  const shippingAddresses = addresses.filter((address) =>
    shippingAddressIds.includes(address.id || '')
  );
  const billingAddresses = addresses.filter((address) =>
    billingAddressIds.includes(address.id || '')
  );

  const restAddresses = addresses.filter(
    (address) =>
      !shippingAddressIds.includes(address.id || '') &&
      !billingAddressIds.includes(address.id || '')
  );

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
  };
};

export { prepareCustomerUpdating };
