import { FooterMenu } from './FooterMenu';

const Contacts = () => {
  const menuItems = [
    {
      text: 'пр. Победы, 18, Киев, Украина, 01135',
    },
    {
      text: '+38 (111) 222-33-44',
      link: 'tel:+381112223344',
    },
    { text: 'Пн-Вс 9.00 - 18.00' },
    {
      text: 'oopterator@rs.school',
      link: 'mailto:oopterator@rs.school',
    },
  ];

  return <FooterMenu className="contacts" title="Контакты" menuItems={menuItems} />;
};

export { Contacts };
