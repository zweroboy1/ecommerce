import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CART_ROUTE } from '../../../constants/route';
import CartDropdown from '../../../components/CartDropdown';
import { Context } from '../../../store/Context';
import { CartData } from '../../../types';

const CartIcon = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();
  const cartQuantity = user?.user?.cart?.lineItems.length
    ? user?.user?.cart?.lineItems.reduce((prev, cur) => prev + cur.quantity, 0)
    : 0;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleCartClick = () => {
    history(CART_ROUTE);
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
    <div className="minicart" ref={cartRef} onMouseEnter={openCart} onMouseLeave={closeCart}>
      <div className="minicart__title" onClick={handleCartClick}>
        <i className="minicart__icon header-icon">
          {cartQuantity > 0 && <span className="minicart__count">{cartQuantity}</span>}
        </i>
      </div>
      {isCartOpen && <CartDropdown closeCart={closeCart} cartData={user?.user?.cart as CartData} />}
    </div>
  );
});

export { CartIcon };
