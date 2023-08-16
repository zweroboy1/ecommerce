import { PropsWithoutRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { registrationValidationSchema } from '../utils/registrationValidation';
import { Button } from './Button';
import { Input } from './Input';
import { RegistrationFormProps } from '../types';

const RegistrationForm = ({ ...initialValues }: PropsWithoutRef<RegistrationFormProps>) => {
  const [checkDefaultAddress, setCheckDefaultAddress] = useState(false);
  const onSubmit = async (
    values: RegistrationFormProps,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
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
    setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void
  ) => {
    setCheckDefaultAddress(true);
    if (e.target.checked) {
      Object.keys(values.shippingAddress).forEach((key) => {
        setFieldValue(`billingAddress.${key}`, values.shippingAddress[key]);
      });
    }
  };

  return (
    <div className="form-wrapper">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registrationValidationSchema}>
        {({ values, setFieldValue, isValid, isSubmitting }) => (
          <Form>
            <Input label="Your Name" name="name" placeholder="Enter your name" type="text" />

            <Input label="Your Surname" name="surname" placeholder="Enter your surname" type="text" />

            <Input label="Your Email" name="email" placeholder="Enter your email" type="email" />

            <Input label="Your Password" name="password" placeholder="Enter your password" type="password" />

            <Input label="Your Date Of Birth" name="dateOfBirth" placeholder="Enter your date of birth" type="date" />

            <div className="address-row">
              <h2>Shipping Address</h2>
              <label>
                <span>Set as a default address</span>
                <input
                  type="checkbox"
                  onChange={(e) => setDefaultAddress(e, values, setFieldValue)}
                  checked={checkDefaultAddress}
                />
              </label>

              <Input label="City" name="shippingAddress.city" placeholder="Enter your city" type="text" />

              <Input label="Street" name="shippingAddress.street" placeholder="Enter street" type="text" />

              <Input label="Code" name="shippingAddress.code" placeholder="Enter code" type="text" />

              <Input label="Country" name="shippingAddress.country" placeholder="Enter country" type="text" />
            </div>

            <div className="address-row">
              <h2>Billing Address</h2>
              <Input
                label="City"
                name="billingAddress.city"
                placeholder="Enter your city"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <Input
                label="Street"
                name="billingAddress.street"
                placeholder="Enter street"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <Input
                label="Code"
                name="billingAddress.code"
                placeholder="Enter code"
                type="text"
                defaultAddress={{ checkDefaultAddress, setCheckDefaultAddress }}
              />

              <Input
                label="Country"
                name="billingAddress.country"
                placeholder="Enter country"
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
