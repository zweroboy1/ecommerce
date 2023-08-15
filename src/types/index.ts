type InputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  className?: string;
  id?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  list?: string;
  step?: string;
  min?: string;
  max?: string;
  defaultValue?: string;
  multiple?: boolean;
  accept?: string;
  capture?: string;
  spellCheck?: boolean;
  wrap?: string;
};

type RegistrationFormProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    code: string;
    country: string;
  };
};

export type { InputProps, RegistrationFormProps };
