import { NavLink } from 'react-router-dom';
import { ACCOUNT_ROUTE } from '../../../constants/route';

const Account = () => {
  return (
    <div className="my-account">
      <div className="my-account__title">
        <NavLink to={ACCOUNT_ROUTE} title="Мой профиль" className={'my-account__link'}>
          <i className="my-account__icon header-icon"></i>
        </NavLink>
      </div>
    </div>
  );
};

export { Account };
