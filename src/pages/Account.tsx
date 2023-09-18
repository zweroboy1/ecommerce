import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { UpdatingForm } from '../components/UpdatingForm';
import { BreadcrumbsPage } from '../components/BreadcrumbsPage';

const Account = () => {
  const breadcrumbs = [{ to: '.', text: 'Мой профиль' }];
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main my-profile container">
        <BreadcrumbsPage links={breadcrumbs} />
        <h1>Мой профиль</h1>
        <UpdatingForm />
      </main>
      <Footer />
    </div>
  );
};

export { Account };
