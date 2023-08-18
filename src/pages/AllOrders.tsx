import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const AllOrders = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Все заказы</h1>
      </main>
      <Footer />
    </div>
  );
};

export { AllOrders };
