import { NavLink } from 'react-router-dom';
import { CART_ROUTE } from '../../../constants/route';

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__title">
        <NavLink to={CART_ROUTE} title="">
          <i className="cart__icon header-icon"></i>
        </NavLink>
      </div>
    </div>
  );
};

export { Cart };
