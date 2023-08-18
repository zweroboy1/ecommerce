import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const PhotoVideo = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Фото и видео техника</h1>
      </main>
      <Footer />
    </div>
  );
};

export { PhotoVideo };
