import { PAYMENT_ROUTE, RETURN_ROUTE, PROMOTIONS_ROUTE } from '../../../constants/route';
import { FooterMenu } from './FooterMenu';

const Store = () => {
  const menuItems = [
    { text: 'Доставка', link: PAYMENT_ROUTE },
    { text: 'Возврат товара', link: RETURN_ROUTE },
    { text: 'Все промоакции', link: PROMOTIONS_ROUTE },
  ];

  return <FooterMenu className="store" title="Магазин" menuItems={menuItems} />;
};

export { Store };
