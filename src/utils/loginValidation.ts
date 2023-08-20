import * as yup from 'yup';
import {
  CONTAIN_AT,
  CONTAIN_DOMAIN_NAME,
  MIN_8_LENGTH,
  NOT_LEADING,
  NO_CORRECT_EMAIL,
  ONE_LOWERCASE_LETTER,
  ONE_NUMBER,
  ONE_SPECIAL_CHARACTER,
  ONE_UPPERCASE_LETTER,
  REQUIRED_FILL,
} from '../constants/errorMassages';

const emailTest = (value: string): yup.ValidationError | true => {
  if (value === '' || value.length < 1) {
    return new yup.ValidationError(REQUIRED_FILL, value, 'email');
  }
  if (value.trim() !== value) {
    return new yup.ValidationError(NOT_LEADING, value, 'email');
  }
  if (!value.includes('@')) {
    return new yup.ValidationError(CONTAIN_AT, value, 'email');
  }
  if (!value.split('@')[1].includes('.')) {
    return new yup.ValidationError(CONTAIN_DOMAIN_NAME, value, 'email');
  }
  return true;
};
const emailValidation = yup
  .string()
  .required(REQUIRED_FILL)
  .test('email-validation', NO_CORRECT_EMAIL, emailTest)
  .required(REQUIRED_FILL)
  .email(NO_CORRECT_EMAIL);

const passwordValidation = yup
  .string()
  .required(REQUIRED_FILL)
  .min(8, MIN_8_LENGTH)
  .matches(/[a-z]/, ONE_LOWERCASE_LETTER)
  .matches(/[A-Z]/, ONE_UPPERCASE_LETTER)
  .matches(/[0-9]/, ONE_NUMBER)
  .matches(/\W/, ONE_SPECIAL_CHARACTER)
  .test('no-leading-trailing-spaces', NOT_LEADING, (value) => {
    return value.trim() === value;
  });

const loginValidationSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export { loginValidationSchema };
