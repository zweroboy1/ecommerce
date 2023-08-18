import FooterMenu from './FooterMenu';

const Contacts = () => {
  const menuItems = [
    { text: 'г. Boston, 44 Main street' },
    {
      text: '+38 (111) 222-33-44',
      link: 'tel:+381112223344',
    },
    { text: 'Пн-Вс 9.00 - 18.00' },
    {
      text: 'oopterator@rs.school',
      link: 'mailto:oopterator@rs.school',
    },
    { text: 'Посмотреть на карте', link: '' },
  ];

  return <FooterMenu className="contacts" title="Контакты" menuItems={menuItems} />;
};

export { Contacts };
