import { PropsWithoutRef } from 'react';
import { Form, Formik } from 'formik';
import { registrationValidationSchema } from '../constants/registrationValidation';
import { RegistrationFormProps } from '../types';
import { Button } from './Button';
import { Input } from './Input';

const RegistrationForm = ({ ...initialValues }: PropsWithoutRef<RegistrationFormProps>) => {
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

  return (
    <div className="form-wrapper">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registrationValidationSchema}>
        {({ errors, touched, isValid, isSubmitting }) => (
          <Form>
            <Input
              label="Your Name"
              name="name"
              placeholder="Enter your name"
              type="text"
              className={errors.name && touched.name ? 'error' : ''}
            />
            <Input
              label="Your Surname"
              name="surname"
              placeholder="Enter your surname"
              type="text"
              className={errors.surname && touched.surname ? 'error' : ''}
            />
            <Input
              label="Your Email"
              name="email"
              placeholder="Enter your email"
              type="email"
              className={errors.email && touched.email ? 'error' : ''}
            />
            <Input
              label="Your Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              className={errors.password && touched.password ? 'error' : ''}
            />
            <Input
              label="Your Date Of Birth"
              name="dateOfBirth"
              placeholder="Enter your date of birth"
              type="date"
              className={errors.dateOfBirth && touched.dateOfBirth ? 'error' : ''}
            />
            <Input
              label="Your Address"
              name="address"
              placeholder="Enter your address"
              type="text"
              className={errors.address && touched.address ? 'error' : ''}
            />
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
