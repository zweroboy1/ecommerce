import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { UpdatingForm } from '../components/UpdatingForm';

const Account = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main my-profile container">
        <div className="breadcrumbs">
          <a href="/" className="breadcrumbs__link">
            <bdi>Главная</bdi>
          </a>
          <span className="breadcrumbs__slash">/</span>
          <a href="/account" className="breadcrumbs__link">
            <bdi>Мой профиль</bdi>
          </a>
        </div>
        <h1>Мой профиль</h1>
        <UpdatingForm />
      </main>
      <Footer />
    </div>
  );
};

export { Account };
