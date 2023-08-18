import { NavLink } from 'react-router-dom';
import { Login } from '../components/Login';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { REGISTRATION_ROUTE } from '../constants/route';

const Auth = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <div className="authorization">
          <div className="authorization__container">
            <h1>Войти</h1>
            <Login />
          </div>
          <div className="authorization__information">
            <h4>Не зарегистрированы?</h4>
            <p>Создание учетной записи займет не больше минуты.</p>
            <NavLink to={REGISTRATION_ROUTE}>Создать учетную запись</NavLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Auth };
