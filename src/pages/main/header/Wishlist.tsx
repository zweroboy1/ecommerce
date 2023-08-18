import { NavLink } from 'react-router-dom';
import { SAVED_ROUTE } from '../../../constants/route';

const Wishlist = () => {
  return (
    <div className="top-wishlist">
      <div className="top-wishlist__title">
        <NavLink to={SAVED_ROUTE} rel="nofollow"></NavLink>
      </div>
    </div>
  );
};

export { Wishlist };
