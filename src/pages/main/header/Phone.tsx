import { NavLink } from 'react-router-dom';

const Phone = () => {
  return (
    <div className="phone">
      <div className="phone__content">
        <div className="phone__wrap">
          <div className="phone__icon">&nbsp;</div>
          <div className="phone__items">
            <NavLink to="tel:+381112223344">
              <bdi>+38 (111) 222-33-44</bdi>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Phone };
