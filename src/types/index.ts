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
  [x: string]: string;
  street: string;
  city: string;
  postCode: string;
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

export type { InputProps, RegistrationFormProps, ButtonProps, Address, Country };
