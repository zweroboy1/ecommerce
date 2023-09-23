import { useState, useContext } from 'react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from './Button';
import { UpdatingUserSettingsInitialValues } from '../types';
import { UpdatingField } from './UpdatingField';
import {
  updatingPasswordValidationSchema,
  updatingValidationSchema,
} from '../utils/updatingValidation';
import { changePassword, updateUser } from '../services/commercetoolsApi';
import { Context } from '../store/Context';
import 'react-toastify/dist/ReactToastify.css';

const UpdatingUserSettingsForm = observer(() => {
  const { user } = useContext(Context);

  if (!user || user.user === null || user.user.user === null) {
    return null;
  }

  const { email } = user.user.user;
  const [initialValues, setInitialValues] = useState<UpdatingUserSettingsInitialValues>({
    email,
    password: '',
    passwordNew: '',
    passwordConfirm: '',
  });

  const [isUpdateUserSettingsForm, setIsUpdateUserSettingsForm] = useState({
    email: false,
    password: false,
    passwordNew: false,
    passwordConfirm: false,
  });
  const [isValidPasswordFields, setIsValidPasswordFields] = useState({
    password: true,
    passwordNew: true,
    passwordConfirm: true,
  });

  const setIsUpdateFieldsOfUserSettingsForm = (name: string, value: boolean) => {
    setIsUpdateUserSettingsForm((prev) => ({ ...prev, [name]: value }));
  };

  const [isChangeUserSettingsForm, setIsChangeUserSettingsForm] = useState({
    email: false,
    password: false,
    passwordNew: false,
    passwordConfirm: false,
  });

  const isChangePasswords =
    isChangeUserSettingsForm.password &&
    isChangeUserSettingsForm.passwordNew &&
    isChangeUserSettingsForm.passwordConfirm;

  const isValidPasswords =
    isValidPasswordFields.password &&
    isValidPasswordFields.passwordNew &&
    isValidPasswordFields.passwordConfirm;

  const setIsChangeFieldsOfUserSettingsForm = (name: string, value: boolean) => {
    setIsChangeUserSettingsForm((prev) => ({ ...prev, [name]: value }));
  };

  const savePersonalData = async (
    type: string,
    values: Partial<Record<'firstName' | 'lastName' | 'dateOfBirth' | 'email', string>>
  ) => {
    if (type === 'email') {
      const data = [{ action: 'changeEmail', email: values.email }];
      try {
        const userData = await updateUser(
          data,
          user?.getUser()!.user!.id || '',
          user?.getUser()!.token.access_token || '',
          user?.getUser()!.user!.version || 1
        );
        const userToken = user?.user?.token;
        const userCard = user?.user?.cart;
        if (userToken) {
          user?.setUser({ user: userData, cart: userCard!, token: userToken });
        }
        setInitialValues({
          ...initialValues,
          email: userData.email,
        });
        setIsChangeUserSettingsForm({ ...isChangeUserSettingsForm, email: false });
        setIsUpdateUserSettingsForm({ ...isUpdateUserSettingsForm, email: false });
        toast.success('E-mail успешно изменен!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  const savePassword = async (values: Record<'password' | 'passwordNew', string>) => {
    const data = { password: values.password, passwordNew: values.passwordNew };
    try {
      const userData = await changePassword(
        data,
        user?.getUser()!.user!.email || '',
        user?.getUser()!.user!.id || '',
        user?.getUser()!.token.access_token || '',
        user?.getUser()!.user!.version || 1
      );

      user?.setUser({ user: userData.user, cart: userData.cart, token: userData.token });
      setIsChangeUserSettingsForm({
        ...isChangeUserSettingsForm,
        password: false,
        passwordNew: false,
        passwordConfirm: false,
      });
      setIsUpdateUserSettingsForm({
        ...isUpdateUserSettingsForm,
        password: false,
        passwordNew: false,
        passwordConfirm: false,
      });
      toast.success('Пароль успешно изменен!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="personal-data">
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={updatingValidationSchema}
        enableReinitialize={true}
      >
        {({ values, setFieldTouched, validateField, setFieldValue }) => {
          return (
            <Form>
              <div className="personal-data">
                <h2>Настройки профиля</h2>

                <UpdatingField
                  label="E-mail"
                  name="email"
                  placeholder="Введите e-mail"
                  type="email"
                  touch={{ setFieldTouched }}
                  valid={{ validateField }}
                  isUpdateForm={isUpdateUserSettingsForm.email}
                  setIsUpdateFields={setIsUpdateFieldsOfUserSettingsForm}
                  initValue={initialValues.email}
                  setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                  setFieldValue={setFieldValue}
                  isChangeField={isChangeUserSettingsForm.email}
                  onSave={async () => {
                    await savePersonalData('email', { email: values.email });
                  }}
                />

                {!isUpdateUserSettingsForm.password && (
                  <>
                    <Button
                      className="button"
                      type="button"
                      onClick={() => {
                        setIsUpdateUserSettingsForm({
                          ...isUpdateUserSettingsForm,
                          password: true,
                          passwordNew: true,
                          passwordConfirm: true,
                        });
                      }}
                    >
                      Изменить пароль
                    </Button>
                  </>
                )}
                {isUpdateUserSettingsForm.password && (
                  <>
                    <h3>Изменение пароля</h3>
                    <UpdatingField
                      label="Введите текущий пароль"
                      name="password"
                      placeholder="Введите текущий пароль"
                      type="password"
                      touch={{ setFieldTouched }}
                      valid={{ validateField }}
                      setValid={async (value) => {
                        try {
                          await updatingPasswordValidationSchema.validate(
                            {
                              password: value,
                              passwordNew: values.passwordNew,
                              passwordConfirm: values.passwordConfirm,
                            },
                            { abortEarly: false }
                          );
                          setIsValidPasswordFields({
                            ...isValidPasswordFields,
                            password: true,
                            passwordNew: true,
                            passwordConfirm: true,
                          });
                        } catch (error) {
                          setIsValidPasswordFields({
                            ...isValidPasswordFields,
                            password: false,
                          });
                        }
                      }}
                      isUpdateForm={isUpdateUserSettingsForm.password}
                      initValue={initialValues.password}
                      setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                      setFieldValue={setFieldValue}
                      isChangeField={isChangeUserSettingsForm.password}
                    />
                    <UpdatingField
                      label="Введите новый пароль"
                      name="passwordNew"
                      placeholder="Введите новый пароль"
                      type="password"
                      touch={{ setFieldTouched }}
                      valid={{ validateField }}
                      setValid={async (value) => {
                        try {
                          await updatingPasswordValidationSchema.validate(
                            {
                              password: values.password,
                              passwordNew: value,
                              passwordConfirm: values.passwordConfirm,
                            },
                            { abortEarly: false }
                          );
                          setIsValidPasswordFields({
                            ...isValidPasswordFields,
                            password: true,
                            passwordNew: true,
                            passwordConfirm: true,
                          });
                        } catch (error) {
                          setIsValidPasswordFields({
                            ...isValidPasswordFields,
                            passwordNew: false,
                          });
                        }
                      }}
                      isUpdateForm={isUpdateUserSettingsForm.passwordNew}
                      initValue={initialValues.passwordNew}
                      setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                      setFieldValue={setFieldValue}
                      isChangeField={isChangeUserSettingsForm.passwordNew}
                    />
                    <UpdatingField
                      label="Подтвердите новый пароль"
                      name="passwordConfirm"
                      placeholder="Подтвердите новый пароль"
                      type="password"
                      touch={{ setFieldTouched }}
                      valid={{ validateField }}
                      setValid={async (value) => {
                        try {
                          await updatingPasswordValidationSchema.validate(
                            {
                              password: values.password,
                              passwordNew: values.passwordNew,
                              passwordConfirm: value,
                            },
                            { abortEarly: false }
                          );
                          setIsValidPasswordFields({
                            ...isValidPasswordFields,
                            password: true,
                            passwordNew: true,
                            passwordConfirm: true,
                          });
                        } catch (error) {
                          setIsValidPasswordFields({
                            ...isValidPasswordFields,
                            passwordConfirm: false,
                          });
                        }
                      }}
                      isUpdateForm={isUpdateUserSettingsForm.passwordConfirm}
                      initValue={initialValues.passwordConfirm}
                      setIsChangeFields={setIsChangeFieldsOfUserSettingsForm}
                      setFieldValue={setFieldValue}
                      isChangeField={isChangeUserSettingsForm.passwordConfirm}
                    />
                    <div className="button-wrapper">
                      <Button
                        className="button"
                        type="button"
                        onClick={async () => {
                          if (isChangePasswords && isValidPasswords) {
                            await savePassword({
                              password: values.password,
                              passwordNew: values.passwordNew,
                            });
                          }
                        }}
                        disabled={!isValidPasswords || !isChangePasswords}
                      >
                        Сохранить пароль
                      </Button>
                      <Button
                        className="button"
                        type="button"
                        onClick={() => {
                          setIsUpdateUserSettingsForm({
                            ...isUpdateUserSettingsForm,
                            password: false,
                            passwordNew: false,
                            passwordConfirm: false,
                          });
                          setIsChangeUserSettingsForm({
                            ...isChangeUserSettingsForm,
                            password: false,
                            passwordNew: false,
                            passwordConfirm: false,
                          });
                          setIsValidPasswordFields({
                            password: true,
                            passwordNew: true,
                            passwordConfirm: true,
                          });
                          setFieldValue('password', initialValues.password, false);
                          setFieldValue('passwordNew', initialValues.passwordNew, false);
                          setFieldValue('passwordConfirm', initialValues.passwordConfirm, false);
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
});

export { UpdatingUserSettingsForm };
