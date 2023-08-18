import { NavLink } from 'react-router-dom';
import { COMPARE_ROUTE } from '../../../constants/route';

const ComparedProducts = () => {
  return (
    <div className="top-compared-products">
      <div className="top-compared-products__title">
        <NavLink to={COMPARE_ROUTE} title="" rel="nofollow"></NavLink>
      </div>
    </div>
  );
};

export { ComparedProducts };
