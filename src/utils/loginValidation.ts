import * as Yup from 'yup';

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

export { validationSchema };
