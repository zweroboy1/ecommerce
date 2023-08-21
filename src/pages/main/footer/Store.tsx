import {
  GIFT_CERTIFICATES_ROUTE,
  BRANDS_ROUTE,
  SITE_MAP_ROUTE,
  BLOG_ROUTE,
} from '../../../constants/route';
import { FooterMenu } from './FooterMenu';

const Store = () => {
  const menuItems = [
    { text: 'Подарочные сертификаты', link: GIFT_CERTIFICATES_ROUTE },
    { text: 'Торговые марки', link: BRANDS_ROUTE },
    { text: 'Карта сайта', link: SITE_MAP_ROUTE },
    { text: 'Блог', link: BLOG_ROUTE },
  ];

  return <FooterMenu className="store" title="Магазин" menuItems={menuItems} />;
};

export { Store };
