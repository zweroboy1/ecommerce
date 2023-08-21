import { FooterMenu } from './FooterMenu';
import { SocialLinks } from './SocialLinks';
import { ABOUT_ROUTE, CONTACTS_ROUTE } from '../../../constants/route';

const MyAccount = () => {
  const menuItems = [
    { text: 'О нас', link: ABOUT_ROUTE },
    { text: 'Обратная связь', link: CONTACTS_ROUTE },
  ];

  return (
    <div>
      <FooterMenu className="my-account" title="Информация" menuItems={menuItems} />
      <SocialLinks />
    </div>
  );
};

export { MyAccount };
