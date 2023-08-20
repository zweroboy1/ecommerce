import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form, Field } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/Context';
import { Credentials } from '../types';
import { getUser } from '../services/commercetoolsApi';
import { CT_NO_USER_ERROR, CT_WRONG_PASSWORD_ERROR } from '../constants/apiMessages';
import { SOMETHING_WRONG } from '../constants/errorMessages';
import { loginValidationSchema } from '../utils/loginValidation';

const Login: React.FC = observer(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serviceError, setServiceError] = useState('');
  const history = useNavigate();
  const { user } = useContext(Context);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={(
        values,
        {
          setSubmitting,
          resetForm,
        }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
      ) => {
        async function sendRequestWithCredentials(credentials: Credentials) {
          try {
            const userResponse = await getUser(credentials);

            if (userResponse instanceof Error) {
              throw Error(userResponse.message);
            }

            setSubmitting(false);
            resetForm();
            user?.setIsAuth(true);
            user?.setUser(userResponse);
            history('/');
          } catch (error) {
            if (error instanceof Error && error.message === CT_NO_USER_ERROR) {
              setEmailError(CT_NO_USER_ERROR);
            } else if (error instanceof Error && error.message === CT_WRONG_PASSWORD_ERROR) {
              setPasswordError(CT_WRONG_PASSWORD_ERROR);
            } else {
              setServiceError(SOMETHING_WRONG);
            }
          }
        }
        sendRequestWithCredentials(values);
      }}
      validateOnChange={true}
    >
      {({
        isValid,
        isSubmitting,
        dirty,
        touched,
        errors,
        handleChange,
        setSubmitting,
        validateField,
        setFieldTouched,
      }) => (
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (emailError !== '') {
                  setEmailError('');
                  setSubmitting(false);
                }
                setFieldTouched('email', true, true);
                handleChange(e);
                validateField('email');
              }}
            />
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (passwordError !== '') {
                    setPasswordError('');
                    setSubmitting(false);
                  }
                  setFieldTouched('password', true, true);
                  handleChange(e);
                  validateField('password');
                }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
            {(touched.password && errors.password) || passwordError !== '' ? (
              <div className="password__error">
                {errors.password}
                {passwordError}
              </div>
            ) : (
              ''
            )}
          </div>
          <button
            className="button button-second"
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Войти
          </button>
          {serviceError !== '' && <div className="service__error">{serviceError}</div>}
        </Form>
      )}
    </Formik>
  );
});

export { Login };
