import { NavLink } from 'react-router-dom';
import { RegistrationForm } from '../components/RegistrationForm';
import { DATE_MINUS_13_YEARS } from '../utils/datetime';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { AUTH_ROUTE } from '../constants/route';

const Registration = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: DATE_MINUS_13_YEARS.toLocaleDateString('en-ca'),
    shippingAddressStreet: '',
    shippingAddressCity: '',
    shippingAddressPostCode: '',
    shippingAddressCountry: '',
    isShippingAddressDefault: false,
    billingAddressStreet: '',
    billingAddressCity: '',
    billingAddressPostCode: '',
    billingAddressCountry: '',
    isBillingAddressDefault: false,
  };

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <div className="authorization">
          <div className="authorization__container">
            <h1>Создать учетную запись</h1>
            <RegistrationForm {...initialValues} />
          </div>
          <div className="authorization__information">
            <h4>Преимущества зарегистрированного пользователя:</h4>
            <ul>
              <li>Отслеживание заказов на персональной странице</li>
              <li>Возможность настроить магазин под себя для более удобных покупок</li>
              <li>Ускоренное оформление последующих заказов</li>
            </ul>
            <div className="authorization__login">
              Уже есть учетная запись? Тогда просто жмите
              <NavLink to={AUTH_ROUTE}> Вход</NavLink>.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Registration };
