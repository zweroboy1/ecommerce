import { NavLink } from 'react-router-dom';
import { COMPARE_ROUTE } from '../../../constants/route';

const ComparedProducts = () => {
  return (
    <div className="compared-products">
      <div className="compared-products__title">
        <NavLink to={COMPARE_ROUTE} title="" rel="nofollow">
          <i className="compared-products__icon header-icon"></i>
        </NavLink>
      </div>
    </div>
  );
};

export { ComparedProducts };
