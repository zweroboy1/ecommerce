import FooterMenu from './FooterMenu';

const Store = () => {
  const menuItems = [
    { text: 'О нас', link: '' },
    { text: 'Обратная связь', link: '' },
    { text: 'Подарочные сертификаты', link: '' },
    { text: 'Торговые марки', link: '' },
    { text: 'Карта сайта', link: '' },
    { text: 'Блог', link: '' },
  ];

  return <FooterMenu className="store" title="Магазин" menuItems={menuItems} />;
};

export { Store };
