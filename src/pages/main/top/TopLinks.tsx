import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PAYMENT_ROUTE, ABOUT_ROUTE, CONTACTS_ROUTE } from '../../../constants/route';

const TopLinks = () => {
  const quickLinks = [
    { text: 'О нас', link: ABOUT_ROUTE },
    { text: 'Доставка и оплата', link: PAYMENT_ROUTE },
    { text: 'Контакты', link: CONTACTS_ROUTE },
    { text: 'Каталог', link: '/catalog' },
  ];

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="top-links">
      <div className="top-links__wrapper">
        <span className="links-phone" onClick={toggleMenu}>
          <span className="icon icon-short-list"></span>
          <span className="top-arrow links-phone__arrow"></span>
        </span>

        <ul className={`text-links ${menuVisible ? 'active' : ''}`}>
          {quickLinks.map((link, index) => (
            <li key={index} className="text-links__item">
              <NavLink className="text-links__a" to={link.link} onClick={closeMenu}>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TopLinks };
