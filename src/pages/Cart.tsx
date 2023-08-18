import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const Cart = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Корзина</h1>
      </main>
      <Footer />
    </div>
  );
};

export { Cart };
