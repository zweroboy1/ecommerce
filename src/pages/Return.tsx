import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const Return = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Возврат товара</h1>
      </main>
      <Footer />
    </div>
  );
};

export { Return };
