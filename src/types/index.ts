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
  };
};

type Address = {
  readonly id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

type RegistrationFormKees =
  | 'name'
  | 'surname'
  | 'email'
  | 'password'
  | 'dateOfBirth'
  | 'shippingAddressStreet'
  | 'shippingAddressCity'
  | 'shippingAddressPostCode'
  | 'shippingAddressCountry'
  | 'billingAddressStreet'
  | 'billingAddressCity'
  | 'billingAddressPostCode'
  | 'billingAddressCountry';

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

type RegisterUser = {
  name: string;
  surname: string;
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

export type {
  InputProps,
  RegistrationFormProps,
  ButtonProps,
  Address,
  Country,
  TokenResponse,
  Customer,
  CustomerWithToken,
  RegisterUser,
  CreateUser
};
