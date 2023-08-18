import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const SiteMap = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Карта сайта</h1>
      </main>
      <Footer />
    </div>
  );
};

export { SiteMap };
