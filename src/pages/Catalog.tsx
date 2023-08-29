import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = Number(searchParams.get('page'));
  const [currentPage, setCurrentPage] = useState(page);

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

  // Получение параметров из query string
  /*
  const sort = searchParams.get('sort');
  const brand = searchParams.get('brand');
  const color = searchParams.get('color');
  const priceMin = searchParams.get('price-min');
  const priceMax = searchParams.get('price-max');
*/
  // console.log(page, sort, brand, color, priceMin, priceMax);
  const totalPages = 2;

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

        <ReactPaginate
          pageCount={totalPages} // Общее количество страниц
          pageRangeDisplayed={5} // Количество отображаемых номеров страниц
          marginPagesDisplayed={2} // Количество отображаемых страниц по краям
          initialPage={currentPage - 1} // Текущая страница
          onPageChange={(selectedPage) => setCurrentPage(selectedPage.selected + 1)} // Обработчик изменения страницы
          containerClassName="pagination" // Класс контейнера пагинации (добавьте стили)
          activeClassName="active" // Класс для активной страницы (добавьте стили)
          disabledClassName="disabled" // Класс для неактивной страницы (добавьте стили)
        />
      </main>
      <Footer />
    </div>
  );
};

export { Catalog };
