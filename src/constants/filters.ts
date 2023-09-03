import { FilterData } from '../types';

const filterData: FilterData[] = [
  {
    id: 1,
    name: 'Бренд',
    options: [
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
    ],
  },
  {
    id: 2,
    name: 'Цвет',
    options: [
      'черный',
      'белый',
      'синий',
      'серебристый',
      'желтый',
      'бежевый',
      'зеленый',
      'фиолетовый',
      'оранжевый',
      'золотой',
      'розовый',
    ],
  },
  {
    id: 3,
    name: 'Цена',
    min: 0,
    max: 300,
  },
];

export { filterData };
