import FooterMenu from './FooterMenu';
import { SocialLinks } from './SocialLinks';
import { AUTH_ROUTE, REGISTRATION_ROUTE } from '../../../constants/route';

const MyAccount = () => {
  const menuItems = [
    { text: 'Войти', link: AUTH_ROUTE, rel: 'nofollow' },
    { text: 'Создать учетную запись', link: REGISTRATION_ROUTE, rel: 'nofollow' },
  ];

  return (
    <div>
      <FooterMenu className="my-account" title="Моя учетная запись" menuItems={menuItems} />
      <SocialLinks />
    </div>
  );
};

export { MyAccount };
