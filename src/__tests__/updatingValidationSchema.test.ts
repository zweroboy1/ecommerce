import { ValidationError } from 'yup';
import {
  updatingValidationSchema,
  updatingPersonalDataValidationSchema,
  updatingAddressValidationSchema,
} from '../utils/updatingValidation';

import { REQUIRED_FILL } from '../constants/errorMessages';

describe('Validation Schemas', () => {
  it('should validate updatingValidationSchema correctly', async () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      email: 'john@example.com',
      shippingAddresses: [
        {
          postalCode: '10001',
          city: 'New York',
          streetName: '123 Main St',
          country: 'US',
        },
      ],
      billingAddresses: [],
      addresses: [],
      password: 'Password123!',
      passwordNew: 'NewPassword456!',
      passwordConfirm: 'NewPassword456!',
      newCity: 'Los Angeles',
      newStreetName: '456 Elm St',
      newPostalCode: '90001',
      newCountry: 'US',
    };

    try {
      // Проверяем, что данные проходят валидацию
      await updatingValidationSchema.validate(validData, { abortEarly: false });
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.errors).toEqual([]);
    }

    // Проверяем, что неверный почтовый индекс вызывает ошибку
    const invalidData = {
      ...validData,
      newPostalCode: 'invalid',
    };

    try {
      await updatingValidationSchema.validate(invalidData, { abortEarly: false });
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.errors).toContain(REQUIRED_FILL);
    }
  });

  // Проверка updatingPersonalDataValidationSchema
  it('should validate updatingPersonalDataValidationSchema correctly', async () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
    };

    try {
      // Проверяем, что данные проходят валидацию
      await updatingPersonalDataValidationSchema.validate(validData, { abortEarly: false });
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.errors).toEqual([]);
    }
  });

  // Проверка updatingAddressValidationSchema
  it('should validate updatingAddressValidationSchema correctly', async () => {
    const validData = {
      postalCode: '10001',
      city: 'New York',
      streetName: '123 Main St',
      country: 'US',
    };

    try {
      // Проверяем, что данные проходят валидацию
      await updatingAddressValidationSchema.validate(validData, { abortEarly: false });
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.errors).toEqual([]);
    }
  });
});
