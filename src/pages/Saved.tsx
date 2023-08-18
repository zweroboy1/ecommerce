import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const Saved = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Отложенные товары</h1>
      </main>
      <Footer />
    </div>
  );
};

export { Saved };
