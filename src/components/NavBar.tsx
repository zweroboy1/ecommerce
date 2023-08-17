import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../store/Context';
import { AUTH_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../constants/route';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLoginPage = location.pathname === AUTH_ROUTE;
  const isRegistrationPage = location.pathname === REGISTRATION_ROUTE;

  return (
    <nav>
      {user?.isAuth && (
        <div>
          <NavLink to={MAIN_ROUTE}>
            <button>Main page</button>
          </NavLink>
          <button onClick={() => user.setIsAuth(false)}>LogOut</button>
        </div>
      )}
      {!user?.isAuth && (
        <div>
          <NavLink to={MAIN_ROUTE}>
            <button>Main page</button>
          </NavLink>
          {!isRegistrationPage && (
            <NavLink to={REGISTRATION_ROUTE}>
              <button>Registration page</button>
            </NavLink>
          )}
          {!isLoginPage && (
            <NavLink to={AUTH_ROUTE}>
              <button>Auth page</button>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
});

export { NavBar };
