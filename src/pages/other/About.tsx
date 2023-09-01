import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';

const About = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>О компании</h1>
      </main>
      <Footer />
    </div>
  );
};

export { About };
