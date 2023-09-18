import promotion1 from '../assets/img/promotion1.png';
import promotion2 from '../assets/img/promotion2.png';
import promotion3 from '../assets/img/promotion3.png';
import promotion4 from '../assets/img/promotion4.png';

const promotionsData = [
  {
    image: promotion1,
    endDate: new Date('2023-10-10'),
    description: 'Минус 1 000 ₴ при покупке на сумму больше 10 000 ₴ по коду ',
    code: 'minus1000',
  },
  {
    image: promotion2,
    endDate: new Date('2023-10-15'),
    description: 'Минус 5% на всё по коду ',
    code: '5percents',
  },
  {
    image: promotion3,
    endDate: new Date('2023-10-20'),
    description: 'Минус 10% на всё по коду ',
    code: 'BLACK_FRIDAY',
  },
  {
    image: promotion4,
    endDate: new Date('2023-10-30'),
    description: 'Минус 30% на видеокамеры по коду ',
    code: 'VIDEO_30',
  },
];

export { promotionsData };
