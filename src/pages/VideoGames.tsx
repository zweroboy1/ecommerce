import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const VideoGames = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Видеоигры</h1>
      </main>
      <Footer />
    </div>
  );
};

export { VideoGames };
