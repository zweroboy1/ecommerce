import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const Electronics = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Электроника</h1>
      </main>
      <Footer />
    </div>
  );
};

export { Electronics };
