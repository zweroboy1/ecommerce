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
  const isMainPage = location.pathname === MAIN_ROUTE;

  return (
    <nav className="nav-bar">
      {user?.isAuth && (
        <div className="nav-bar__block">
          {!isMainPage && (
            <NavLink to={MAIN_ROUTE}>
              <button className="button">Домой</button>
            </NavLink>
          )}
          <button
            className="button button-second"
            onClick={() => {
              user.setIsAuth(false);
              user.setUser(null);
            }}
          >
            Выйти из учетной записи
          </button>
        </div>
      )}
      {!user?.isAuth && (
        <div className="nav-bar__block">
          {!isMainPage && (
            <NavLink to={MAIN_ROUTE}>
              <button className="button">Домой</button>
            </NavLink>
          )}
          {!isRegistrationPage && (
            <NavLink to={REGISTRATION_ROUTE}>
              <button className="button">Регистрация</button>
            </NavLink>
          )}
          {!isLoginPage && (
            <NavLink to={AUTH_ROUTE}>
              <button className="button">Вход</button>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
});

export { NavBar };
