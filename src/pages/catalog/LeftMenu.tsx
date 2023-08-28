import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PHONES_ROUTE } from '../../constants/route';

const LeftMenu = () => {
  const quickLinks = [
    { text: 'Apple iPhone', link: PHONES_ROUTE },
    { text: 'HTC', link: PHONES_ROUTE },
    { text: 'Motorola', link: PHONES_ROUTE },
    { text: 'Nokia', link: PHONES_ROUTE },
    { text: 'Samsung', link: PHONES_ROUTE },
  ];

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="menu">
      <div className="menu__title" onClick={toggleMenu}>
        <i className="menu__icon"></i>
        <span>Категории</span>
      </div>
      <div className={`menu__categories ${menuVisible ? 'active' : ''}`}>
        <ul className="menu__links">
          {quickLinks.map((link, index) => (
            <li key={index} className="menu__item">
              <NavLink className="menu__a" to={link.link}>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { LeftMenu };
