import { useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CART_ROUTE } from '../../../constants/route';
import CartDropdown from '../../../components/CartDropdown';
import { Context } from '../../../store/Context';

const CartIcon = observer(() => {
  const { user } = useContext(Context);
  const cartQuantity = user?.user?.cart?.lineItems.length
    ? user?.user?.cart?.lineItems.reduce((prev, cur) => prev + cur.quantity, 0)
    : 0;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="minicart" ref={cartRef}>
      <div className="minicart__title">
        <NavLink to={CART_ROUTE} title="">
          <i className="minicart__icon header-icon" onClick={toggleCart}>
            <span className="minicart__count">{cartQuantity}</span>
          </i>
        </NavLink>
      </div>
      {isCartOpen && <CartDropdown closeCart={closeCart} />}
    </div>
  );
});

export { CartIcon };
