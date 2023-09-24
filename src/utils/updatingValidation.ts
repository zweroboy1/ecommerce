import * as yup from 'yup';
import {
  MIN_4_LENGTH,
  MIN_5_LENGTH,
  MIN_6_LENGTH,
  MIN_7_LENGTH,
  NO_CORRECT_POST_CODE,
  REQUIRED_FILL,
} from '../constants/errorMessages';
import {
  cityValidation,
  dateOfBirthValidation,
  emailValidation,
  passwordConfirmValidation,
  passwordValidation,
  streetValidation,
  stringValidation,
} from './registrationValidation';

const postCodeValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .when('country', ([country], shema) => {
    if (typeof country === 'string' && country === 'JP') {
      return shema
        .trim()
        .min(7, MIN_7_LENGTH)
        .max(8, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`)
        .matches(/^\d{3}-\d{4}$/, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`);
    }
    if (typeof country === 'string' && country === 'UA') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`);
    }
    if (typeof country === 'string' && country === 'AU') {
      return shema
        .trim()
        .min(4, MIN_4_LENGTH)
        .max(4, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`)
        .matches(/^\d{4}$/, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`);
    }
    if (typeof country === 'string' && country === 'BN') {
      return shema
        .trim()
        .min(6, MIN_6_LENGTH)
        .max(7, `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`)
        .matches(
          /^[A-Z]{2}[ ]?\d{4}$/,
          `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`
        );
    }
    if (typeof country === 'string' && country === 'DE') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`);
    }
    return shema;
  });

const newPostCodeValidation = yup
  .string()
  .trim()
  .required(REQUIRED_FILL)
  .when('newCountry', ([country], shema) => {
    if (typeof country === 'string' && country === 'JP') {
      return shema
        .trim()
        .min(7, MIN_7_LENGTH)
        .max(8, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`)
        .matches(/^\d{3}-\d{4}$/, `${NO_CORRECT_POST_CODE} Япония! Например: "100-0101"`);
    }
    if (typeof country === 'string' && country === 'UA') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE} Украина! Например: "24213"`);
    }
    if (typeof country === 'string' && country === 'AU') {
      return shema
        .trim()
        .min(4, MIN_4_LENGTH)
        .max(4, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`)
        .matches(/^\d{4}$/, `${NO_CORRECT_POST_CODE} Австралия! Например: "2060"`);
    }
    if (typeof country === 'string' && country === 'BN') {
      return shema
        .trim()
        .min(6, MIN_6_LENGTH)
        .max(7, `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`)
        .matches(
          /^[A-Z]{2}[ ]?\d{4}$/,
          `${NO_CORRECT_POST_CODE} Бруней! Например: "TH1149" или "TH 1149"`
        );
    }
    if (typeof country === 'string' && country === 'DE') {
      return shema
        .trim()
        .min(5, MIN_5_LENGTH)
        .max(5, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`)
        .matches(/^\d{5}$/, `${NO_CORRECT_POST_CODE}Германия! Например: "01067"`);
    }
    return shema;
  });

const addressesArray = yup.array().of(
  yup.object().shape({
    postalCode: postCodeValidation,
    city: cityValidation,
    streetName: streetValidation,
    country: yup.string().required(REQUIRED_FILL),
  })
);

const addressValidation = yup.object().shape({
  postalCode: postCodeValidation,
  city: cityValidation,
  streetName: streetValidation,
  country: yup.string().required(REQUIRED_FILL),
});

const newAddressValidation = yup.object().shape({
  newPostalCode: newPostCodeValidation,
  newCity: cityValidation,
  newStreetName: streetValidation,
  newCountry: yup.string().required(REQUIRED_FILL),
});

const newPostalCodeValidation = yup.object().shape({
  newPostalCode: newPostCodeValidation,
  newCountry: yup.string().required(REQUIRED_FILL),
});

const newCityValidation = yup.object().shape({
  newCity: cityValidation,
});

const newStreetNameValidation = yup.object().shape({
  newStreetName: streetValidation,
});

const newCountryValidation = yup.object().shape({
  newCountry: yup.string().required(REQUIRED_FILL),
});

const updatingValidationSchema = yup.object().shape({
  firstName: stringValidation,
  lastName: stringValidation,
  dateOfBirth: dateOfBirthValidation,
  email: emailValidation,
  shippingAddresses: addressesArray,
  billingAddresses: addressesArray,
  addresses: addressesArray,
  password: passwordValidation,
  passwordNew: passwordValidation,
  passwordConfirm: passwordConfirmValidation,
  newCity: cityValidation,
  newStreetName: streetValidation,
  newPostalCode: newPostCodeValidation,
  newCountry: yup.string().required(REQUIRED_FILL),
});

const updatingPersonalDataValidationSchema = yup.object().shape({
  firstName: stringValidation,
  lastName: stringValidation,
  dateOfBirth: dateOfBirthValidation,
});
const firstNameValidationSchema = yup.object().shape({
  firstName: stringValidation,
});
const lastNameValidationSchema = yup.object().shape({
  lastName: stringValidation,
});
const dateOfBirthValidationSchema = yup.object().shape({
  dateOfBirth: dateOfBirthValidation,
});

const updatingPasswordValidationSchema = yup.object().shape({
  password: passwordValidation,
  passwordNew: passwordValidation,
  passwordConfirm: passwordConfirmValidation,
});

const updatingAddressValidationSchema = addressValidation;

export {
  updatingValidationSchema,
  updatingPersonalDataValidationSchema,
  updatingAddressValidationSchema,
  updatingPasswordValidationSchema,
  newAddressValidation,
  newPostalCodeValidation,
  newCityValidation,
  newStreetNameValidation,
  newCountryValidation,
  dateOfBirthValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
};
