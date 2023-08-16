import * as yup from 'yup';
import { DATE_MINUS_13_YEARS } from './datetime';
import { MIN_1_LENGTH, MIN_8_LENGTH, ONLY_LETTERS, REQUIRED_FILL } from '../constants/errorMassages';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emailValidation = yup.string().required(REQUIRED_FILL).matches(emailRegex, 'Incorrect email');

const passwordValidation = yup.string().required(REQUIRED_FILL).min(8, MIN_8_LENGTH);

const stringValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/^[a-zA-Z]+$/, ONLY_LETTERS);

const dateOfBirthValidation = yup
  .date()
  .required('This is required')
  .default(() => new Date())
  .max(DATE_MINUS_13_YEARS, 'You must be at least 13 years old');

const registrationValidationSchema = yup.object({
  name: stringValidation,
  surname: stringValidation,
  email: emailValidation,
  password: passwordValidation,
  dateOfBirth: dateOfBirthValidation,
});

export { registrationValidationSchema };
