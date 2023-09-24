import * as yup from 'yup';
import {
  MIN_8_LENGTH,
  NOT_LEADING,
  NO_CORRECT_EMAIL,
  ONE_LOWERCASE_LETTER,
  ONE_NUMBER,
  ONE_SPECIAL_CHARACTER,
  ONE_UPPERCASE_LETTER,
  REQUIRED_FILL,
} from '../constants/errorMessages';
import { emailRegex, emailTest } from './registrationValidation';

const emailValidation = yup
  .string()
  .required(REQUIRED_FILL)
  .test('email-validation', NO_CORRECT_EMAIL, emailTest)
  .matches(emailRegex, NO_CORRECT_EMAIL)
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
