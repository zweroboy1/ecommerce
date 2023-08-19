import { ALL_ORDERS_ROUTE, SAVED_ROUTE, COMPARE_ROUTE } from '../../../constants/route';
import FooterMenu from './FooterMenu';

const Order = () => {
  const menuItems = [
    { text: 'Ваши заказы', link: ALL_ORDERS_ROUTE, rel: 'nofollow' },
    { text: 'Отложенные', link: SAVED_ROUTE, rel: 'nofollow' },
    { text: 'Список сравнения', link: COMPARE_ROUTE, rel: 'nofollow' },
  ];

  return <FooterMenu className="order" title="Покупательский сервис" menuItems={menuItems} />;
};

export { Order };
