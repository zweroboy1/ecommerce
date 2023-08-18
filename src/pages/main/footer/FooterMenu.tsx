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
  return (
    <div className={className}>
      <div className={`${className}__block footer__block`}>
        <div className={`${className}__header footer__header`}>
          <span>{title}</span>
        </div>
        <div className={`${className}__body footer__body`}>
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

export default FooterMenu;
