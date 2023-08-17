import { useState } from 'react';
import { Formik, Form, Field /* , ErrorMessage */ } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Credentials } from '../types/api';
import { getUser } from '../services/commercetoolsApi';
import {
  /* CT_ERROR,CT_LOGIN_ERROR, */
  CT_NO_USER_ERROR,
  CT_WRONG_PASSWORD_ERROR,
} from '../constants/apiMessages';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const validationSchema = Yup.object({
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
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        async function sendRequestWithCredentials(credentials: Credentials) {
          try {
            const userResponse = await getUser(credentials);
            // eslint-disable-next-line no-console
            console.log(userResponse);

            // вот они данные нашего пользователя и его токены... загоняй их в mobx, а странизу редирект на главную
          } catch (error) {
            // eslint-disable-next-line no-console
            console.dir(error);

            if (error instanceof Error && error.message === CT_NO_USER_ERROR) {
              setEmailError(CT_NO_USER_ERROR);
              // это я пишу ошибку возле емейла, что такого юзера нет в базе
              // как делать её setEmailError('') при onChange этого инпута???
            } else if (error === CT_WRONG_PASSWORD_ERROR) {
              setPasswordError(CT_WRONG_PASSWORD_ERROR);
              // это я пишу ошибку возле пароля, что пароль не подходит
              // та же беда, что и в прошлом
            }

            /*
            еще могут приехать такие ошибки
            CT_ERROR, // эта если запросы на комерцтулз не проходят, либо апи клиент поломался, либо если его айди/секрет не подходят или скоупы битые
            CT_LOGIN_ERROR, // эта - если случилась ещё какая-то неведомая проблема при логине
            и я их не обрабатываю :( не знаю, куда писать ошибки и что делать с полями/кнопками
            */
          }
        }
        sendRequestWithCredentials(values);
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
              className={(touched.email && errors.email) || emailError !== '' ? 'input__error' : ''}
              formNoValidate
            />
            {/* <ErrorMessage name="email" component="div" /> не получилось сюда засовывать emailError который приходит из апишки */}
            {(touched.email && errors.email) || emailError !== '' ? (
              <div className="email__error">
                {errors.email}
                {emailError}
              </div>
            ) : (
              ''
            )}
          </div>

          <div>
            <label>Password</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              className={
                (touched.password && errors.password) || passwordError !== '' ? 'input__error' : ''
              }
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
            {/* <ErrorMessage name="password" component="div" /> */}
            {(touched.password && errors.password) || passwordError !== '' ? (
              <div className="password__error">
                {errors.password}
                {passwordError}
              </div>
            ) : (
              ''
            )}
          </div>
          {/* кнопка активна только в первый раз когда форма валидна, потом дизейблена :( */}
          <button type="submit" disabled={isSubmitting || !isValid || !dirty}>
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
};

export { Login };
