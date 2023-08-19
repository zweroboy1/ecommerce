import { NavLink } from 'react-router-dom';
import { SAVED_ROUTE } from '../../../constants/route';

const Wishlist = () => {
  return (
    <div className="wishlist">
      <div className="wishlist__title">
        <NavLink to={SAVED_ROUTE} rel="nofollow">
          <i className="wishlist__icon header-icon"></i>
        </NavLink>
      </div>
    </div>
  );
};

export { Wishlist };
