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
  code: string;
  country: string;
};

type RegistrationFormProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress: Address;
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

export type { InputProps, RegistrationFormProps, ButtonProps, Address };
