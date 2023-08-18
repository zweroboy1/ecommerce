import FooterMenu from './FooterMenu';

const Order = () => {
  const menuItems = [
    { text: 'Ваши заказы', link: '', rel: 'nofollow' },
    { text: 'Отложенные', link: '', rel: 'nofollow' },
    { text: 'Список сравнения', link: '', rel: 'nofollow' },
  ];

  return <FooterMenu className="order" title="Покупательский сервис" menuItems={menuItems} />;
};

export { Order };
