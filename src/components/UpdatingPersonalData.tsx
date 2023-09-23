import { useState, useContext } from 'react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from './Button';
import { UpdatingField } from './UpdatingField';
import {
  dateOfBirthValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
  updatingValidationSchema,
} from '../utils/updatingValidation';
import { updateUser } from '../services/commercetoolsApi';
import { Context } from '../store/Context';
import 'react-toastify/dist/ReactToastify.css';

const UpdatingPersonalDataForm = observer(() => {
  const { user } = useContext(Context);

  if (!user || user.user === null || user.user.user === null) {
    return null;
  }
  const { firstName, lastName, dateOfBirth } = user.user.user;
  const [initialValues, setInitialValues] = useState<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }>({ firstName, lastName, dateOfBirth });

  const [isUpdatePersonalDataForm, setIsUpdatePersonalDataForm] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });
  const [isChangePersonalDataForm, setIsChangePersonalDataForm] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });
  const [isValidPersonalDataFields, setIsValidPersonalDataFields] = useState({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
  });

  const isUpdatePersonalData =
    isUpdatePersonalDataForm.firstName ||
    isUpdatePersonalDataForm.lastName ||
    isUpdatePersonalDataForm.dateOfBirth;

  const isChangePersonalData =
    isChangePersonalDataForm.firstName ||
    isChangePersonalDataForm.lastName ||
    isChangePersonalDataForm.dateOfBirth;

  const isValidPersonalData =
    isValidPersonalDataFields.firstName &&
    isValidPersonalDataFields.lastName &&
    isValidPersonalDataFields.dateOfBirth;

  const setIsUpdateFieldsOfPersonalDataForm = (name: string, value: boolean) => {
    setIsUpdatePersonalDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const setIsChangeFieldsOfPersonalDataForm = (name: string, value: boolean) => {
    setIsChangePersonalDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const savePersonalData = async (
    type: string[],
    values: Partial<Record<'firstName' | 'lastName' | 'dateOfBirth' | 'email', string>>
  ) => {
    const data = [];
    if (type.includes('firstName')) {
      data.push({
        action: 'setFirstName',
        firstName: values.firstName,
      });
    }
    if (type.includes('lastName')) {
      data.push({
        action: 'setLastName',
        lastName: values.lastName,
      });
    }
    if (type.includes('dateOfBirth')) {
      data.push({
        action: 'setDateOfBirth',
        dateOfBirth: values.dateOfBirth,
      });
    }
    try {
      const { id, version } = user.getUser()!.user!;
      const userData = await updateUser(data, id, user.getUser()!.token.access_token, version);
      const userToken = user.user?.token;
      const userCard = user?.user?.cart;
      if (userToken) {
        user?.setUser({ user: userData, cart: userCard!, token: userToken });
      }
      const {
        firstName: newFirstName,
        lastName: newLastName,
        dateOfBirth: newDateOfBirth,
      } = user.getUser()!.user!;
      setInitialValues({
        firstName: newFirstName,
        lastName: newLastName,
        dateOfBirth: newDateOfBirth,
      });
      setIsChangePersonalDataForm({
        firstName: type.includes('firstName') ? false : isChangePersonalDataForm.firstName,
        lastName: type.includes('lastName') ? false : isChangePersonalDataForm.lastName,
        dateOfBirth: type.includes('dateOfBirth') ? false : isChangePersonalDataForm.dateOfBirth,
      });
      setIsUpdatePersonalDataForm({
        firstName: type.includes('firstName') ? false : isUpdatePersonalDataForm.firstName,
        lastName: type.includes('lastName') ? false : isUpdatePersonalDataForm.lastName,
        dateOfBirth: type.includes('dateOfBirth') ? false : isUpdatePersonalDataForm.dateOfBirth,
      });
      toast.success('Личные данные успешно изменены!', {
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
    <div className="user-info">
      <h2>Личные данные</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={updatingValidationSchema}
        enableReinitialize={true}
      >
        {({ values, setFieldTouched, validateField, setFieldValue }) => {
          return (
            <Form>
              <UpdatingField
                label="Имя"
                name="firstName"
                placeholder="Введите имя"
                type="text"
                touch={{ setFieldTouched }}
                valid={{ validateField }}
                setValid={async (value) => {
                  try {
                    await firstNameValidationSchema.validate(
                      {
                        firstName: value,
                      },
                      { abortEarly: false }
                    );
                    setIsValidPersonalDataFields({
                      ...isValidPersonalDataFields,
                      firstName: true,
                    });
                  } catch (error) {
                    setIsValidPersonalDataFields({
                      ...isValidPersonalDataFields,
                      firstName: false,
                    });
                  }
                }}
                isUpdateForm={isUpdatePersonalDataForm.firstName}
                setIsUpdateFields={setIsUpdateFieldsOfPersonalDataForm}
                initValue={initialValues.firstName}
                setIsChangeFields={setIsChangeFieldsOfPersonalDataForm}
                setFieldValue={setFieldValue}
                isChangeField={isChangePersonalDataForm.firstName}
                onSave={async () => {
                  await savePersonalData(['firstName'], { firstName: values.firstName });
                }}
              />

              <UpdatingField
                label="Фамилия"
                name="lastName"
                placeholder="Введите фамилию"
                type="text"
                touch={{ setFieldTouched }}
                valid={{ validateField }}
                setValid={async (value) => {
                  try {
                    await lastNameValidationSchema.validate(
                      {
                        lastName: value,
                      },
                      { abortEarly: false }
                    );
                    setIsValidPersonalDataFields({
                      ...isValidPersonalDataFields,
                      lastName: true,
                    });
                  } catch (error) {
                    setIsValidPersonalDataFields({
                      ...isValidPersonalDataFields,
                      lastName: false,
                    });
                  }
                }}
                isUpdateForm={isUpdatePersonalDataForm.lastName}
                setIsUpdateFields={setIsUpdateFieldsOfPersonalDataForm}
                initValue={initialValues.lastName}
                setIsChangeFields={setIsChangeFieldsOfPersonalDataForm}
                setFieldValue={setFieldValue}
                isChangeField={isChangePersonalDataForm.lastName}
                onSave={async () => {
                  await savePersonalData(['lastName'], { lastName: values.lastName });
                }}
              />

              <UpdatingField
                label="Дата рождения"
                name="dateOfBirth"
                type="date"
                touch={{ setFieldTouched }}
                valid={{ validateField }}
                setValid={async (value) => {
                  try {
                    await dateOfBirthValidationSchema.validate(
                      {
                        dateOfBirth: value,
                      },
                      { abortEarly: false }
                    );
                    setIsValidPersonalDataFields({
                      ...isValidPersonalDataFields,
                      dateOfBirth: true,
                    });
                  } catch (error) {
                    setIsValidPersonalDataFields({
                      ...isValidPersonalDataFields,
                      dateOfBirth: false,
                    });
                  }
                }}
                isUpdateForm={isUpdatePersonalDataForm.dateOfBirth}
                setIsUpdateFields={setIsUpdateFieldsOfPersonalDataForm}
                initValue={initialValues.dateOfBirth}
                setIsChangeFields={setIsChangeFieldsOfPersonalDataForm}
                setFieldValue={setFieldValue}
                isChangeField={isChangePersonalDataForm.dateOfBirth}
                onSave={async () => {
                  await savePersonalData(['dateOfBirth'], { dateOfBirth: values.dateOfBirth });
                }}
              />

              {!isUpdatePersonalData && (
                <Button
                  className="button"
                  type="button"
                  onClick={() => {
                    setIsUpdatePersonalDataForm({
                      firstName: true,
                      lastName: true,
                      dateOfBirth: true,
                    });
                  }}
                >
                  Редактировать профиль
                </Button>
              )}

              {isUpdatePersonalData && (
                <Button
                  className="button"
                  type="button"
                  disabled={!isChangePersonalData || !isValidPersonalData}
                  onClick={async () => {
                    if (isChangePersonalData) {
                      await savePersonalData(['firstName', 'lastName', 'dateOfBirth'], {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        dateOfBirth: values.dateOfBirth,
                      });
                    }
                  }}
                >
                  Сохранить
                </Button>
              )}
              {isUpdatePersonalData && (
                <Button
                  className="button"
                  type="button"
                  onClick={() => {
                    setIsUpdatePersonalDataForm({
                      firstName: false,
                      lastName: false,
                      dateOfBirth: false,
                    });
                    setFieldValue('firstName', initialValues.firstName, true);
                    setFieldValue('lastName', initialValues.lastName, true);
                    setFieldValue('dateOfBirth', initialValues.dateOfBirth, true);
                    setIsChangePersonalDataForm({
                      firstName: false,
                      lastName: false,
                      dateOfBirth: false,
                    });
                  }}
                >
                  Отменить
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
});

export { UpdatingPersonalDataForm };
