import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const Televisions = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Телевизоры / Видео</h1>
      </main>
      <Footer />
    </div>
  );
};

export { Televisions };
