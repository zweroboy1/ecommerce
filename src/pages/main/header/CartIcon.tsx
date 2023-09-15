import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { CART_ROUTE } from '../../../constants/route';
import CartDropdown from '../../../components/CartDropdown';

const CartIcon = () => {
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
            <span className="minicart__count">3</span>
          </i>
        </NavLink>
      </div>
      {isCartOpen && <CartDropdown closeCart={closeCart} />}
    </div>
  );
};

export { CartIcon };
