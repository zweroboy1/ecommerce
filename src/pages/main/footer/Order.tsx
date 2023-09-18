import { REGISTRATION_ROUTE, AUTH_ROUTE } from '../../../constants/route';
import { FooterMenu } from './FooterMenu';

const Order = () => {
  const menuItems = [
    { text: 'Вход', link: AUTH_ROUTE, rel: 'nofollow' },
    { text: 'Регистрация', link: REGISTRATION_ROUTE, rel: 'nofollow' },
    // { text: 'Отложенные', link: SAVED_ROUTE, rel: 'nofollow' },
    // { text: 'Список сравнения', link: COMPARE_ROUTE, rel: 'nofollow' },
  ];

  return <FooterMenu className="order" title="Покупательский сервис" menuItems={menuItems} />;
};

export { Order };
