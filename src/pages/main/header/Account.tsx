import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../constants/route';

const Account = () => {
  return (
    <div className="top-my-account">
      <div className="top-my-account__title">
        <NavLink to={MAIN_ROUTE} title=""></NavLink>
      </div>
    </div>
  );
};

export { Account };
