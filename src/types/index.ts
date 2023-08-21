type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  className?: string;
  maxLength?: number;
  label: string;
  defaultAddress?: {
    checkDefaultAddress: boolean;
    setCheckDefaultAddress: (value: boolean) => void;
    setFieldTouched?: (field: string, isTouched?: boolean | undefined) => void;
  };
  touch?: {
    setFieldTouched?: (field: string, isTouched?: boolean | undefined) => void;
  };
  valid?: {
    validateField?: (field: string, isValid?: boolean | undefined) => void;
  };
};

type Address = {
  readonly id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

/*
type RegistrationFormKees =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'dateOfBirth'
  | 'shippingAddressStreet'
  | 'shippingAddressCity'
  | 'shippingAddressPostCode'
  | 'shippingAddressCountry'
  | 'isShippingAddressDefault'
  | 'billingAddressStreet'
  | 'billingAddressCity'
  | 'billingAddressPostCode'
  | 'billingAddressCountry'
  | 'isBillingAddressDefault';

type RegistrationFormProps = {
  // name: string;
  // surname: string;
  // email: string;
  // password: string;
  // dateOfBirth: string;
  // shippingAddressStreet: string;
  // shippingAddressCity: string;
  // shippingAddressPostCode: string;
  // shippingAddressCountry: string;
  // billingAddressStreet: string;
  // billingAddressCity: string;
  // billingAddressPostCode: string;
  // billingAddressCountry: string;
  [K in RegistrationFormKees]: string;
};
*/

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  shippingAddressStreet: string;
  shippingAddressCity: string;
  shippingAddressPostCode: string;
  shippingAddressCountry: string;
  isShippingAddressDefault: boolean;
  billingAddressStreet: string;
  billingAddressCity: string;
  billingAddressPostCode: string;
  billingAddressCountry: string;
  isBillingAddressDefault: boolean;
};

type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
};

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  tabIndex?: number;
};

type Country = {
  [key: string]: string;
};

type TokenResponse = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type Customer = {
  id: string;
  version: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
};

type CustomerWithToken = {
  user: Customer;
  token: TokenResponse;
};

export type Credentials = {
  email: string;
  password: string;
};

type StateFields = {
  customer?: null | CustomerWithToken;
};

export type {
  InputProps,
  ButtonProps,
  Address,
  Country,
  TokenResponse,
  Customer,
  CustomerWithToken,
  RegisterUser,
  CreateUser,
  StateFields,
};
