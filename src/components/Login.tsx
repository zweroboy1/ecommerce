import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form, Field } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Context } from '../store/Context';
import { Credentials } from '../types/api';
import { getUser } from '../services/commercetoolsApi';
import {
  /* CT_ERROR,CT_LOGIN_ERROR, */
  CT_NO_USER_ERROR,
  CT_WRONG_PASSWORD_ERROR,
} from '../constants/apiMessages';

const Login: React.FC = observer(() => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const history = useNavigate();
  const { user } = useContext(Context);

  const emailValidation = (value: string): Yup.ValidationError | true => {
    if (!value.includes('@')) {
      return new Yup.ValidationError(
        'Адрес электронной почты должен содержать символ "@"',
        value,
        'email'
      );
    }
    if (!value.split('@')[1].includes('.')) {
      return new Yup.ValidationError(
        'Адрес электронной почты должен содержать доменное имя после @',
        value,
        'email'
      );
    }
    if (value.trim() !== value) {
      return new Yup.ValidationError(
        'Адрес электронной почты не должен содержать начальные или конечные пробелы',
        value,
        'email'
      );
    }
    return true;
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Необходимо заполнить!')
      .test('email-validation', 'Invalid email', emailValidation)
      .email('Неверный адрес электронной почты'),
    password: Yup.string()
      .required('Необходимо заполнить!')
      .min(8, 'Пароль должен быть не менее 8 символов')
      .matches(/[a-z]/, 'Пароль должен содержать минимум одну строчную букву (a-z)')
      .matches(/[A-Z]/, 'Пароль должен содержать минимум одну заглавную букву (A-Z)')
      .matches(/[0-9]/, 'Пароль должен содержать минимум одну цифру (0-9)')
      .matches(/\W/, 'Пароль должен содержать минимум один специальный символ (например, !@#$%^&*)')
      .test(
        'no-leading-trailing-spaces',
        'Пароль не должен содержать начальные или конечные пробелы',
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
            user?.setIsAuth(true);
            history('/');
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
          <div className="form-fields">
            <label>
              E-mail <span>*</span>
            </label>
            <Field
              type="email"
              placeholder="Введите e-mail"
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

          <div className="form-fields">
            <label>
              Пароль <span>*</span>
            </label>
            <div className="password-block">
              <Field
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                name="password"
                className={
                  (touched.password && errors.password) || passwordError !== ''
                    ? 'input__error'
                    : ''
                }
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
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
          <button
            className="button button-second"
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
});

export { Login };
