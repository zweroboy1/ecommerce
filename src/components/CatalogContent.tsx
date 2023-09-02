import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { CATEGORIES } from '../constants/categories';
import ProductList from './ProductList';
import Breadcrumbs from './Breadcrumbs';
import CatalogMenu from './CatalogMenu';
import { Breadcrumb } from '../types';
import { buildBreadcrumbs } from '../utils/buildBreadcrumbs';
import { Filters } from '../pages/catalog/Filters';
import { Sorting } from '../pages/catalog/Sorting';

const CatalogContent: React.FC<{ category: string; subcategory: string }> = ({
  category,
  subcategory,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = Number(searchParams.get('page'));
  const [pageTitle, setPageTitle] = useState('');

  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = 2;
  const [currentSort, setCurrentSort] = useState('default');

  const [selectedFilters, setSelectedFilters] = useState({});
  /*
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
*/
  const handleSortChange = (newSort: string) => {
    setCurrentSort(newSort);
  };

  const handleFilterChange = (filterId: number, value: string | number) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  let currentCategoryUrl = '';
  if (subcategory) {
    currentCategoryUrl = subcategory;
  } else if (category) {
    currentCategoryUrl = category;
  }
  const categoryBreadcrumbs: Breadcrumb[] = buildBreadcrumbs(currentCategoryUrl);

  useEffect(() => {
    const currentCategory = CATEGORIES.find((cat) => cat.url === currentCategoryUrl);
    if (currentCategory?.ruName) {
      setPageTitle(currentCategory?.ruName);
    }
  }, [subcategory, category, currentCategoryUrl, selectedFilters]);
  // Получение параметров из query string
  /*
  const sort = searchParams.get('sort');
  const brand = searchParams.get('brand');
  const color = searchParams.get('color');
  const priceMin = searchParams.get('price-min');
  const priceMax = searchParams.get('price-max');
*/
  // console.log(page, sort, brand, color, priceMin, priceMax);
  const initialPage = currentPage - 1;

  return (
    <>
      <div className="row">
        <h1>{pageTitle}</h1>
        <Breadcrumbs breadcrumbs={categoryBreadcrumbs} />
      </div>
      <div className="row catalog">
        <div className="left">
          <CatalogMenu categories={CATEGORIES} />
        </div>
        <div className="right">
          <Filters onFilterChange={(filterId, values) => handleFilterChange(filterId, values[0])} />
          <Sorting onSortChange={handleSortChange} />
          <ProductList category={subcategory || category || 'catalog'} currentSort={currentSort} />

          <ReactPaginate
            pageCount={totalPages} // Общее количество страниц
            pageRangeDisplayed={5} // Количество отображаемых номеров страниц
            marginPagesDisplayed={2} // Количество отображаемых страниц по краям
            initialPage={initialPage} // Текущая страница
            onPageChange={(selectedPage) => setCurrentPage(selectedPage.selected + 1)} // Обработчик изменения страницы
            containerClassName="pagination" // Класс контейнера пагинации (добавьте стили)
            activeClassName="active" // Класс для активной страницы (добавьте стили)
            disabledClassName="disabled" // Класс для неактивной страницы (добавьте стили)
          />
        </div>
      </div>
    </>
  );
};

export { CatalogContent };
