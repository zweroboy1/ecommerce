import * as yup from 'yup';

const emailValidation = yup
  .string()
  .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Incorrect email')
  .required('This is required');
const passwordValidation = yup
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .required('This is required');
const nameValidation = yup
  .string()
  .required('This is required')
  .trim()
  .matches(/^[a-zA-Z]+$/, 'Incorrect name');
const dateOfBirthValidation = yup
  .string()
  .required('This is required')
  .matches(/^\d{4}-\d{2}-\d{2}$/, 'Incorrect date');

const registrationValidationSchema = yup.object({
  name: nameValidation,
  surname: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  dateOfBirth: dateOfBirthValidation,
});

export { registrationValidationSchema };
