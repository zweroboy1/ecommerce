import { FilterData } from '../types';

const filterData: FilterData[] = [
  {
    id: 1,
    name: 'Бренд',
    options: ['Apple', 'Samsung', 'HTC', 'Nokia', 'Motorola'],
  },
  {
    id: 2,
    name: 'Цвет',
    options: ['Черный', 'Темно-синий', 'Золото', 'Серебро'],
  },
  {
    id: 3,
    name: 'Цена',
    min: 0,
    max: 300,
  },
];

export { filterData };
