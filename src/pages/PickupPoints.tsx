import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const PickupPoints = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Пункты самовывоза</h1>
      </main>
      <Footer />
    </div>
  );
};

export { PickupPoints };