import { PropsWithoutRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { registrationValidationSchema } from '../utils/registrationValidation';
import { Button } from './Button';
import { Input } from './Input';
import { RegistrationFormProps } from '../types';
import { country } from '../constants/country';

const RegistrationForm = ({ ...initialValues }: PropsWithoutRef<RegistrationFormProps>) => {
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false);
  const onSubmit = async (
    values: RegistrationFormProps,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    // eslint-disable-next-line no-console
    console.log(values);
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          setSubmitting(false);
          // eslint-disable-next-line no-console
          console.log('Registration success');
          resolve(true);
        }, 1000);
      });
      resetForm();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Something wrong');
    }
  };

  const setDefaultAddress = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: RegistrationFormProps,
    setFieldValue: (
      field: keyof RegistrationFormProps,
      value: string,
      shouldValidate?: boolean | undefined
    ) => void,
    setFieldTouched: (field: keyof RegistrationFormProps, isTouched?: boolean | undefined) => void
  ) => {
    if (e.target.checked) {
      setCheckDefaultAddress(true);
      setFieldValue('billingAddressStreet', values.shippingAddressStreet, true);
      setFieldValue('billingAddressCity', values.shippingAddressCity, true);
      setFieldValue('billingAddressPostCode', values.shippingAddressPostCode, true);
      setFieldValue('billingAddressCountry', values.shippingAddressCountry, true);
      setTimeout(() => {
        setFieldTouched('billingAddressStreet', true);
        setFieldTouched('billingAddressCity', true);
        setFieldTouched('billingAddressPostCode', true);
        setFieldTouched('billingAddressCountry', true);
      }, 100);
    } else {
      setCheckDefaultAddress(false);
    }
  };

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registrationValidationSchema}
      >
        {({ values, setFieldValue, setFieldTouched, isValid, isSubmitting, errors, touched }) => (
          <Form>
            <Input label="Your Name" name="name" placeholder="Enter your name" type="text" />

            <Input
              label="Your Surname"
              name="surname"
              placeholder="Enter your surname"
              type="text"
            />

            <Input label="Your Email" name="email" placeholder="Enter your email" type="email" />

            <Input
              label="Your Password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />

            <Input
              label="Your Date Of Birth"
              name="dateOfBirth"
              placeholder="Enter your date of birth"
              type="date"
            />

            <div className="address-row">
              <h2>Shipping Address</h2>
              <label>
                <span>Set as a default address</span>
                <input
                  type="checkbox"
                  onChange={async (e) => {
                    setDefaultAddress(e, values, setFieldValue, setFieldTouched);
                  }}
                  checked={checkDefaultAddress}
                />
              </label>

              <Input
                label="City"
                name="shippingAddressCity"
                placeholder="Enter your city"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <label
                className={`label ${
                  touched.shippingAddressCountry && errors.shippingAddressCountry ? 'error' : ''
                }`}
              >
                <span>Country</span>
                <Field name="shippingAddressCountry" as="select">
                  {Object.keys(country).map((key, i) => (
                    <option key={key} value={country[key]} disabled={i === 0}>
                      {key}
                    </option>
                  ))}
                </Field>
                {touched.shippingAddressCountry && errors.shippingAddressCountry && (
                  <div className="error-message">{errors.shippingAddressCountry}</div>
                )}
              </label>

              <Input
                label="Street"
                name="shippingAddressStreet"
                placeholder="Enter street"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <Input
                label="Post Code"
                name="shippingAddressPostCode"
                placeholder="Enter post code"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />
            </div>

            <div className="address-row">
              <h2>Billing Address</h2>

              <label
                className={`label ${
                  touched.billingAddressCountry && errors.billingAddressCountry ? 'error' : ''
                }`}
              >
                <span>Country</span>
                <Field name="billingAddressCountry" as="select">
                  {Object.keys(country).map((key, i) => (
                    <option key={key} value={country[key]} disabled={i === 0}>
                      {key}
                    </option>
                  ))}
                </Field>
                {touched.billingAddressCountry && errors.billingAddressCountry && (
                  <div className="error-message">{errors.billingAddressCountry}</div>
                )}
              </label>

              <Input
                label="City"
                name="billingAddressCity"
                placeholder="Enter your city"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <Input
                label="Street"
                name="billingAddressStreet"
                placeholder="Enter street"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <Input
                label="Post Code"
                name="billingAddressPostCode"
                placeholder="Enter post code"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />
            </div>

            <Button type="submit" disabled={!isValid}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { RegistrationForm };
