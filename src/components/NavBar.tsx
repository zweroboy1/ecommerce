import { NavLink } from 'react-router-dom';
import {
  AUTH_ROUTE,
  DEFAULT_ROUTE,
  REGISTRATION_ROUTE,
} from '../constants/route';

const NavBar = () => {
  return (
    <div>
      <NavLink to={DEFAULT_ROUTE}>
        <button>Main page</button>
      </NavLink>
      <NavLink to={REGISTRATION_ROUTE}>
        <button>Registration page</button>
      </NavLink>
      <NavLink to={AUTH_ROUTE}>
        <button>Auth page</button>
      </NavLink>
    </div>
  );
};

export { NavBar };
