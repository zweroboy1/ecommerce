const REQUIRED_FILL = 'Это поле должно быть заполнено';
const MIN_1_LENGTH = 'Это поле должно содержать минимум 1 символ';
const MIN_8_LENGTH = 'Это поле должно содержать минимум 8 символов';
const MIN_7_LENGTH = 'Это поле должно содержать минимум 7 символов';
const MIN_6_LENGTH = 'Это поле должно содержать минимум 6 символов';
const MIN_5_LENGTH = 'Это поле должно содержать минимум 5 символов';
const MIN_4_LENGTH = 'Это поле должно содержать минимум 4 символов';
const ONLY_LETTERS = 'Это поле должно содержать только буквы';
const ONLY_UPPERCASE_LETTER_AND_NUMBER = 'Это поле должно содержать только прописные буквы и цифры';
const ONE_LETTER = 'Это поле должно содержать хотя бы одну букву';
const ONE_LOWERCASE_LETTER = 'Это поле должно содержать хотя бы одну строчную букву (a-z)';
const ONE_UPPERCASE_LETTER = 'Это поле должно содержать хотя бы одну заглавную букву (A-Z)';
const ONE_NUMBER = 'Это поле должно содержать хотя бы одну цифру (0-9)';
const ONE_SPECIAL_CHARACTER =
  'Это поле должно содержать хотя бы один специальный символ (например, !@#$%^&*)';
const NOT_LEADING = 'Это поле не должно содержать ведущих или завершающих пробелов';
const MIN_DATE = 'Вам должно быть как минимум 13 лет';
const COUNTRY_CODE =
  'Это поле должно содержать двухзначный код страны в соответствии с ISO 3166-1 alpha-2';
const CONTAIN_AT = 'Адрес электронной почты должен содержать символ "@"';
const CONTAIN_DOMAIN_NAME = 'Адрес электронной почты должен содержать доменное имя после @';
const NO_CORRECT_EMAIL = 'Некорректный адрес электронной почты';
const USER_ALREADY_EXISTS = 'Пользователь с таким адресом электронной почты уже зарегистрирован!';
const SOMETHING_WRONG = 'Что-то пошло не так. Попробуйте зайти позже.';
const SUCCESS_REGISTRATION_MEGGAGE = 'Поздравляем! Вы успешно зарегистрировались!';
const NO_CORRECT_POST_CODE = 'Некорректный почтовый индекс для выбранной страны: ';
const NOT_CONFIRM = 'Пароль не совпадает с полем "Введите новый пароль"';

export {
  REQUIRED_FILL,
  MIN_1_LENGTH,
  MIN_8_LENGTH,
  MIN_5_LENGTH,
  ONLY_LETTERS,
  ONE_LOWERCASE_LETTER,
  ONE_UPPERCASE_LETTER,
  ONE_NUMBER,
  ONE_SPECIAL_CHARACTER,
  NOT_LEADING,
  MIN_DATE,
  COUNTRY_CODE,
  ONE_LETTER,
  ONLY_UPPERCASE_LETTER_AND_NUMBER,
  CONTAIN_AT,
  CONTAIN_DOMAIN_NAME,
  NO_CORRECT_EMAIL,
  USER_ALREADY_EXISTS,
  SOMETHING_WRONG,
  SUCCESS_REGISTRATION_MEGGAGE,
  NO_CORRECT_POST_CODE,
  MIN_7_LENGTH,
  MIN_4_LENGTH,
  MIN_6_LENGTH,
  NOT_CONFIRM,
};
