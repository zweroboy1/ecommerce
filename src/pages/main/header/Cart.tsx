import { NavLink } from 'react-router-dom';
import { CART_ROUTE } from '../../../constants/route';

const Cart = () => {
  return (
    <div className="top-cart">
      <div className="top-cart__title">
        <NavLink to={CART_ROUTE} title=""></NavLink>
      </div>
    </div>
  );
};

export { Cart };
