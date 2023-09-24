const LOCALSTORAGE_NAME = 'ecommerce';
const PRODUCTS_ON_PAGE = 12;
const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию', ctSort: '' },
  { value: 'priceAsc', label: 'По цене (возрастающая)', ctSort: 'price asc' },
  { value: 'priceDesc', label: 'По цене (убывающая)', ctSort: 'price desc' },
  { value: 'nameAsc', label: 'По имени (A-Z)', ctSort: 'name.ru asc' },
  { value: 'nameDesc', label: 'По имени (Z-A)', ctSort: 'name.ru desc' },
];

const BRANDS = [
  'Xiaomi',
  'Samsung',
  'Apple',
  'Poco',
  'Daewoo',
  'Dyson',
  'Bosch',
  'Fifine',
  'JBL',
  'LG',
  'Ardesto',
  'Indesit',
  'Panasonic',
  'Canon',
  'Lenovo',
];

const COLORS: Record<string, string> = {
  black: 'черный',
  white: 'белый',
  blue: 'синий',
  silver: 'серебристый',
  yellow: 'желтый',
  beige: 'бежевый',
  green: 'зеленый',
  purple: 'фиолетовый',
  orange: 'оранжевый',
  gold: 'золотой',
  pink: 'розовый',
};

const MAX_PRICE_FILTER = 100000;
export { LOCALSTORAGE_NAME, PRODUCTS_ON_PAGE, SORT_OPTIONS, BRANDS, COLORS, MAX_PRICE_FILTER };
