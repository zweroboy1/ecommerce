import { useParams } from 'react-router-dom';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { CATEGORIES } from '../constants/categories';
import ProductList from '../components/ProductList';
import Breadcrumbs from '../components/Breadcrumbs';
import CatalogMenu from '../components/CatalogMenu';
import { Breadcrumb } from '../types';
import { NotFound } from './NotFound';

const buildBreadcrumbs = (categoryUrl: string, breadcrumbs: Breadcrumb[] = []): Breadcrumb[] => {
  const category = CATEGORIES.find((cat) => cat.url === categoryUrl);
  if (!category) {
    return breadcrumbs.length
      ? breadcrumbs
      : [
          {
            id: 1,
            name: 'Каталог',
            url: '',
          },
        ];
  }

  breadcrumbs.unshift({
    id: category.id,
    name: category.ruName,
    url: category.url,
  });

  if (category.parentId !== null) {
    const parent = CATEGORIES.find((cat) => cat.id === category.parentId);
    if (!parent) {
      return breadcrumbs;
    }
    return buildBreadcrumbs(parent?.url, breadcrumbs);
  }
  return breadcrumbs;
};

const Catalog = () => {
  const { category = '', subcategory = '' } = useParams();
  const findedCategory = CATEGORIES.find((cat) => cat.url === category);
  const findedSubcategory = CATEGORIES.find((cat) => cat.url === subcategory);
  if (!findedCategory || !findedSubcategory) {
    return <NotFound />;
  }

  let categoryBreadcrumbs: Breadcrumb[] = [];

  if (subcategory) {
    categoryBreadcrumbs = buildBreadcrumbs(String(subcategory));
  } else if (category) {
    categoryBreadcrumbs = buildBreadcrumbs(String(category));
  } else {
    categoryBreadcrumbs = buildBreadcrumbs('');
  }

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Каталог</h1>
        <hr />
        <Breadcrumbs breadcrumbs={categoryBreadcrumbs} />
        <hr />
        <ProductList category={subcategory || category || 'catalog'} />
        <CatalogMenu categories={CATEGORIES} />
      </main>
      <Footer />
    </div>
  );
};

export { Catalog };
