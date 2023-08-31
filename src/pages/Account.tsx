import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { UpdatingForm } from '../components/UpdatingForm';

const Account = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Мой профиль</h1>
        <UpdatingForm />
      </main>
      <Footer />
    </div>
  );
};

export { Account };
