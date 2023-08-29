import { Category } from '../types';

const CATEGORIES: Category[] = [
  {
    id: 1,
    enName: 'Catalog',
    ruName: 'Каталог',
    url: '',
    parentId: null,
  },
  {
    id: 2,
    enName: 'Home Appliances',
    ruName: 'Бытовая техника',
    url: 'home-appliances',
    parentId: 1,
  },
  {
    id: 3,
    enName: 'Refrigerators',
    ruName: 'Холодильники',
    url: 'refrigerators',
    parentId: 2,
  },
  {
    id: 4,
    enName: 'Washing Machines',
    ruName: 'Стиральные машины',
    url: 'washing-machines',
    parentId: 2,
  },
  {
    id: 5,
    enName: 'Vacuum Cleaners',
    ruName: 'Пылесосы',
    url: 'vacuum-cleaners',
    parentId: 2,
  },
  {
    id: 6,
    enName: 'Audio and Video',
    ruName: 'Аудио, видео',
    url: 'audio-video',
    parentId: 1,
  },
  {
    id: 7,
    enName: 'Televisions',
    ruName: 'Телевизоры',
    url: 'televisions',
    parentId: 6,
  },
  {
    id: 8,
    enName: 'Headphones',
    ruName: 'Наушники',
    url: 'headphones',
    parentId: 6,
  },
  {
    id: 9,
    enName: 'Video Cameras',
    ruName: 'Видеокамеры',
    url: 'video-cameras',
    parentId: 6,
  },
  {
    id: 10,
    enName: 'Microphones',
    ruName: 'Микрофоны',
    url: 'microphones',
    parentId: 6,
  },
  {
    id: 11,
    enName: 'Phones',
    ruName: 'Телефоны',
    url: 'phones',
    parentId: 1,
  },
  {
    id: 12,
    enName: 'Notebooks',
    ruName: 'Ноутбуки',
    url: 'notebooks',
    parentId: 1,
  },
];

export { CATEGORIES };
