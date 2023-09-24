import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface FooterMenuProps {
  className: string;
  title: string;
  menuItems: {
    text: string;
    link?: string;
    rel?: string;
  }[];
}

const FooterMenu: React.FC<FooterMenuProps> = ({ className, title, menuItems }) => {
  const [isBodyOpen, setIsBodyOpen] = useState(false);

  const toggleBody = () => {
    setIsBodyOpen(!isBodyOpen);
  };

  return (
    <div className={className}>
      <div className={`${className}__block footer__block`}>
        <div
          className={`${className}__header footer__header${isBodyOpen ? ' open' : ''}`}
          onClick={toggleBody}
        >
          <span>{title}</span>
        </div>
        <div className={`${className}__body footer__body${isBodyOpen ? ' open' : ''}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={`${className}__item footer__item`}>
                {item.link ? (
                  <NavLink to={item.link} rel={item.rel}>
                    {item.text}
                  </NavLink>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { FooterMenu };
