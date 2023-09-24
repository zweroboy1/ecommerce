import { Customer, CustomerAddressesUpdating } from '../types';

const prepareCustomerAddressesUpdating = (customer: Customer): CustomerAddressesUpdating => {
  const {
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
    addresses: restAddresses,
    shippingAddresses,
    billingAddresses,
    defaultShippingAddressId,
    defaultBillingAddressId,
  };
};

export { prepareCustomerAddressesUpdating };
