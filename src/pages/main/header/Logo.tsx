import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../constants/route';
import logo from '../../../assets/img/logo.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <NavLink to={MAIN_ROUTE} title="">
        <img className="logo-container__image" alt="logo" title="" src={logo} />
      </NavLink>
    </div>
  );
};

export { Logo };
