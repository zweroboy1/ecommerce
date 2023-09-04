import * as yup from 'yup';
import { DATE_MINUS_13_YEARS } from './datetime';
import {
  MIN_1_LENGTH,
  MIN_4_LENGTH,
  MIN_5_LENGTH,
  MIN_6_LENGTH,
  MIN_7_LENGTH,
  MIN_8_LENGTH,
  MIN_DATE,
  NOT_LEADING,
  NO_CORRECT_EMAIL,
  NO_CORRECT_POST_CODE,
  ONE_LETTER,
  ONE_LOWERCASE_LETTER,
  ONE_NUMBER,
  ONE_SPECIAL_CHARACTER,
  ONE_UPPERCASE_LETTER,
  ONLY_LETTERS,
  REQUIRED_FILL,
  CONTAIN_AT,
  CONTAIN_DOMAIN_NAME,
  NOT_CONFIRM,
} from '../constants/errorMessages';
// eslint-disable-next-line
export const emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+$/;
export const emailTest = (value: string): yup.ValidationError | true => {
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
    return !value || value.trim() === value;
  });

const passwordConfirmValidation = yup
  .string()
  .required(REQUIRED_FILL)
  .min(8, MIN_8_LENGTH)
  .matches(/[a-z]/, ONE_LOWERCASE_LETTER)
  .matches(/[A-Z]/, ONE_UPPERCASE_LETTER)
  .matches(/[0-9]/, ONE_NUMBER)
  .matches(/\W/, ONE_SPECIAL_CHARACTER)
  .test('no-leading-trailing-spaces', NOT_LEADING, (value) => {
    return !value || value.trim() === value;
  })
  .oneOf([yup.ref('passwordNew')], NOT_CONFIRM);

const stringValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/^[a-zA-Zа-яА-ЯъЪЇїЫыЁё \-`]+$/, ONLY_LETTERS);

const cityValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/^[a-zA-Zа-яА-ЯъЪЇїЫыЁё \-`]+$/, ONLY_LETTERS);

const billingPostCodeValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .when('billingAddressCountry', ([billingAddressCountry], shema) => {
    if (typeof billingAddressCountry === 'string' && billingAddressCountry === 'JP') {
      return shema
        .trim()
        .min(7, MIN_7_LENGTH)
        .max(8, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`)
        .matches(/^\d{3}-\d{4}$/, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`);
    }
    if (typeof billingAddressCountry === 'string' && billingAddressCountry === 'UA') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`);
    }
    if (typeof billingAddressCountry === 'string' && billingAddressCountry === 'AU') {
      return shema
        .trim()
        .min(4, MIN_4_LENGTH)
        .max(4, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`)
        .matches(/^\d{4}$/, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`);
    }
    if (typeof billingAddressCountry === 'string' && billingAddressCountry === 'BN') {
      return shema
        .trim()
        .min(6, MIN_6_LENGTH)
        .max(7, `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`)
        .matches(
          /^[A-Z]{2}[ ]?\d{4}$/,
          `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`
        );
    }
    if (typeof billingAddressCountry === 'string' && billingAddressCountry === 'DE') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`);
    }
    return shema;
  });

const shippingPostCodeValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .when('shippingAddressCountry', ([shippingAddressCountry], shema) => {
    if (typeof shippingAddressCountry === 'string' && shippingAddressCountry === 'JP') {
      return shema
        .trim()
        .min(7, MIN_7_LENGTH)
        .max(8, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`)
        .matches(/^\d{3}-\d{4}$/, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`);
    }
    if (typeof shippingAddressCountry === 'string' && shippingAddressCountry === 'UA') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`);
    }
    if (typeof shippingAddressCountry === 'string' && shippingAddressCountry === 'AU') {
      return shema
        .trim()
        .min(4, MIN_4_LENGTH)
        .max(4, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`)
        .matches(/^\d{4}$/, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`);
    }
    if (typeof shippingAddressCountry === 'string' && shippingAddressCountry === 'BN') {
      return shema
        .trim()
        .min(6, MIN_6_LENGTH)
        .max(7, `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`)
        .matches(
          /^[A-Z]{2}[ ]?\d{4}$/,
          `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`
        );
    }
    if (typeof shippingAddressCountry === 'string' && shippingAddressCountry === 'DE') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`);
    }
    return shema;
  });

const streetValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .min(1, MIN_1_LENGTH)
  .matches(/[a-zA-Zа-яА-ЯъЪЇїЫыЁё \-`]/, ONE_LETTER);

const dateOfBirthValidation = yup
  .date()
  .required(REQUIRED_FILL)
  .default(() => new Date())
  .max(DATE_MINUS_13_YEARS, MIN_DATE);

const registrationValidationSchema = yup.object().shape({
  firstName: stringValidation,
  lastName: stringValidation,
  email: emailValidation,
  password: passwordValidation,
  dateOfBirth: dateOfBirthValidation,
  billingAddressCity: cityValidation,
  billingAddressCountry: yup.string().required(REQUIRED_FILL),
  shippingAddressPostCode: shippingPostCodeValidation,
  billingAddressStreet: streetValidation,
  billingAddressPostCode: billingPostCodeValidation,
  shippingAddressCity: cityValidation,
  shippingAddressStreet: streetValidation,
  shippingAddressCountry: yup.string().required(REQUIRED_FILL),
});

export {
  registrationValidationSchema,
  dateOfBirthValidation,
  streetValidation,
  cityValidation,
  stringValidation,
  emailValidation,
  passwordValidation,
  passwordConfirmValidation,
};
