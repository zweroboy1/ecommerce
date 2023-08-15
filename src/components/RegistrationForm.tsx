import { PropsWithoutRef } from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import { Input } from './Input';
import { RegistrationFormProps } from '../types';

const RegistrationForm = ({ ...initialValues }: PropsWithoutRef<RegistrationFormProps>) => {
  const onSubmit = (
    values: RegistrationFormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const { values } = useFormik({ initialValues, onSubmit });
  return (
    <div className="form-wrapper">
      <Formik initialValues={values} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <label className={errors.name && touched.name ? 'error' : ''}>
              <span>Your Name</span>
              <Field name="name" placeholder="Enter your name" component={Input} />
              {errors.name && touched.name && <div className="error">{errors.name}</div>}
            </label>
            <label className={errors.surname && touched.surname ? 'error' : ''}>
              <span>Your Surname</span>
              <Field name="surname" placeholder="Enter your surname" component={Input} />
              {errors.surname && touched.surname && <div className="error">{errors.surname}</div>}
            </label>
            <label className={errors.email && touched.email ? 'error' : ''}>
              <span>Your Email</span>
              <Field name="email" placeholder="Enter your email" component={Input} />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </label>
            <label className={errors.password && touched.password ? 'error' : ''}>
              <span>Your Password</span>
              <Field name="password" placeholder="Enter your password" component={Input} />
              {errors.password && touched.password && <div className="error">{errors.password}</div>}
            </label>
            <label className={errors.dateOfBirth && touched.dateOfBirth ? 'error' : ''}>
              <span>Your Date Of Birth</span>
              <Field name="dateOfBirth" placeholder="Enter your date of birth" component={Input} />
              {errors.dateOfBirth && touched.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
            </label>
            <label className={errors.address && touched.address ? 'error' : ''}>
              <span>Your Address</span>
              <Field name="address" placeholder="Enter your address" component={Input} />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { RegistrationForm };
