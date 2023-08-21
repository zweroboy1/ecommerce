import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const PromotionsAll = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Все акции</h1>
      </main>
      <Footer />
    </div>
  );
};

export { PromotionsAll };
