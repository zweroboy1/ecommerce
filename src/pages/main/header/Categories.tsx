import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ELECTRONICS_ROUTE,
  PHONES_ROUTE,
  PHOTO_VIDEO_ROUTE,
  SPORT_ROUTE,
  TELEVISIONS_ROUTE,
  VIDEO_GAMES_ROUTE,
} from '../../../constants/route';

const Categories = () => {
  const quickLinks = [
    { text: 'Телефоны', link: PHONES_ROUTE },
    { text: 'Электроника', link: ELECTRONICS_ROUTE },
    { text: 'Видеоигры', link: VIDEO_GAMES_ROUTE },
    { text: 'Фото и видео техника', link: PHOTO_VIDEO_ROUTE },
    { text: 'Телевизоры', link: TELEVISIONS_ROUTE },
    { text: 'Спорт', link: SPORT_ROUTE },
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

export { Categories };
