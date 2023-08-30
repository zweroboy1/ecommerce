import { useParams } from 'react-router-dom';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { CATEGORIES } from '../constants/categories';
import { CatalogContent } from '../components/CatalogContent';
import { NotFound } from './NotFound';

const Catalog = () => {
  const { category = '', subcategory = '' } = useParams();
  const findedSubcategory = CATEGORIES.find((cat) => cat.url === subcategory);
  const findedCategory = CATEGORIES.find((cat) => cat.url === category);
  if (!findedCategory || !findedSubcategory) {
    return <NotFound />;
  }

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main content">
        <CatalogContent category={category} subcategory={subcategory} />
      </main>
      <Footer />
    </div>
  );
};

export { Catalog };
