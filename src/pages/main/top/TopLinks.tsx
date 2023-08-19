import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  PAYMENT_ROUTE,
  PICKUP_POINTS_ROUTE,
  RETURN_ROUTE,
  CONTACTS_ROUTE,
} from '../../../constants/route';

const TopLinks = () => {
  const quickLinks = [
    { text: 'Доставка и оплата', link: PAYMENT_ROUTE },
    { text: 'Возврат', link: RETURN_ROUTE },
    { text: 'Пункты самовывоза', link: PICKUP_POINTS_ROUTE },
    { text: 'Контакты', link: CONTACTS_ROUTE },
  ];

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="top-links">
      <div className="top-quick-links">
        <div className="top-quick-links__wrapper">
          <span className="links-phone" onClick={toggleMenu}>
            <span className="icon icon-short-list"></span>
            <span className="top-arrow links-phone__arrow"></span>
          </span>

          <ul className={`text-links ${menuVisible ? 'active' : ''}`}>
            {quickLinks.map((link, index) => (
              <li key={index} className="text-links__item">
                <NavLink className="text-links__a" to={link.link}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { TopLinks };
