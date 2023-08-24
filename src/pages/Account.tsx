import { useContext } from 'react';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { UpdatingForm } from '../components/UpdatingForm';
import { Context } from '../store/Context';
import { prepareCustomerUpdating } from '../utils/prepareCustomerUpdating';

const Account = () => {
  const { user } = useContext(Context);
  const customerUpdating = prepareCustomerUpdating(user!.user!.user);

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Мой профиль</h1>
        <UpdatingForm {...{ ...customerUpdating }} />
      </main>
      <Footer />
    </div>
  );
};

export { Account };
