import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Context } from '../store/Context';
import { getUser } from '../services/commercetoolsApi';

const Login: React.FC = observer(() => {
  const [showPassword, setShowPassword] = React.useState(false);
  const history = useNavigate();
  const { user } = useContext(Context);

  const emailValidation = (value: string): Yup.ValidationError | true => {
    if (!value.includes('@')) {
      return new Yup.ValidationError('Email address must contain an "@" symbol', value, 'email');
    }
    if (!value.split('@')[1].includes('.')) {
      return new Yup.ValidationError(
        'Email address must contain a domain name after @',
        value,
        'email'
      );
    }
    if (value.trim() !== value) {
      return new Yup.ValidationError(
        'Email address must not contain leading or trailing whitespace',
        value,
        'email'
      );
    }
    return true;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .test('email-validation', 'Invalid email', emailValidation)
          .email('Invalid email address'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Password must be at least 8 characters long')
          .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
          .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
          .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
          .matches(/\W/, 'Password must contain at least one special character (e.g., !@#$%^&*)')
          .test(
            'no-leading-trailing-spaces',
            'Password must not contain leading or trailing whitespace',
            (value) => {
              return !value || value.trim() === value;
            }
          ),
      })}
      onSubmit={(values) => {
        // console.log('Submitting:', values);
        getUser(values);
        // Здесь логика отправки данных на сервер, но её ещё нет :((
        user?.setIsAuth(true);
        history('/');
      }}
    >
      {({ isValid, isSubmitting, dirty, touched, errors }) => (
        <Form>
          <div>
            <label>Email address</label>
            <Field
              type="email"
              placeholder="Enter email"
              name="email"
              className={touched.email && errors.email ? 'input__error' : ''}
              formNoValidate
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label>Password</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              className={touched.password && errors.password ? 'input__error' : ''}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting || !isValid || !dirty}>
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
});

export { Login };
