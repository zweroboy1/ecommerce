import * as yup from 'yup';
import { DATE_MINUS_13_YEARS } from './datetime';
import {
  MIN_1_LENGTH,
  MIN_8_LENGTH,
  MIN_DATE,
  NOT_LEADING,
  ONE_LETTER,
  ONE_LOWERCASE_LETTER,
  ONE_NUMBER,
  ONE_SPECIAL_CHARACTER,
  ONE_UPPERCASE_LETTER,
  ONLY_LETTERS,
  ONLY_UPPERCASE_LETTER_AND_NUMBER,
  REQUIRED_FILL,
} from '../constants/errorMassages';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emailValidation = yup.string().required(REQUIRED_FILL).matches(emailRegex, 'Incorrect email');

const passwordValidation = yup
  .string()
  .required(REQUIRED_FILL)
  .min(8, MIN_8_LENGTH)
  .matches(/[a-z]/, ONE_LOWERCASE_LETTER)
  .matches(/[A-Z]/, ONE_UPPERCASE_LETTER)
  .matches(/[0-9]/, ONE_NUMBER)
  .matches(/\W/, ONE_SPECIAL_CHARACTER)
  .test('no-leading-trailing-spaces', NOT_LEADING, (value) => {
    return !value || value.trim() === value;
  });

const stringValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/^[a-zA-Z]+$/, ONLY_LETTERS);

const cityValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/^[a-zA-Z]+$/, ONLY_LETTERS);

const postCodeValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .matches(/^[A-Z0-9 ]+$/, ONLY_UPPERCASE_LETTER_AND_NUMBER);

const streetValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/[a-zA-Z]/, ONE_LETTER);

const dateOfBirthValidation = yup
  .date()
  .required(REQUIRED_FILL)
  .default(() => new Date())
  .max(DATE_MINUS_13_YEARS, MIN_DATE);

const registrationValidationSchema = yup.object({
  name: stringValidation,
  surname: stringValidation,
  email: emailValidation,
  password: passwordValidation,
  dateOfBirth: dateOfBirthValidation,
  billingAddressCity: cityValidation,
  billingAddressStreet: streetValidation,
  billingAddressPostCode: postCodeValidation,
  billingAddressCountry: yup.string().required(REQUIRED_FILL),
  shippingAddressCity: cityValidation,
  shippingAddressStreet: streetValidation,
  shippingAddressPostCode: postCodeValidation,
  shippingAddressCountry: yup.string().required(REQUIRED_FILL),
});

export { registrationValidationSchema };
