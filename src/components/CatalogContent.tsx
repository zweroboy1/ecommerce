import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import { CATEGORIES } from '../constants/categories';
import { PRODUCTS_ON_PAGE, SORT_OPTIONS, MAX_PRICE_FILTER } from '../constants';
import { ProductList } from './ProductList';
import { Breadcrumbs } from './Breadcrumbs';
import { CatalogMenu } from './CatalogMenu';
import { Breadcrumb, Product } from '../types';
import { buildBreadcrumbs } from '../utils/buildBreadcrumbs';
import { BrandFilter } from './BrandFilter';
import { ColorFilter } from './ColorFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { SearchInput } from './SearchInput';
import { Sorting } from '../pages/catalog/Sorting';
import { getProducts } from '../services/commercetoolsApi';
import { mapProduct } from '../utils/mapProduct';
import SelectedFilters from './SelectedFilters';

import 'react-toastify/dist/ReactToastify.css';

const CatalogContent: React.FC<{ category: string; subcategory: string }> = ({
  category,
  subcategory,
}) => {
  const [pageTitle, setPageTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSort, setCurrentSort] = useState('default');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_FILTER);
  const [textQuery, setTextQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const handleSortChange = (newSort: string) => {
    setCurrentSort(newSort);
  };

  const handleBrandChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const handleColorChange = (colors: string[]) => {
    setSelectedColors(colors);
  };
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearchChange = (text: string) => {
    setTextQuery(text);
  };

  const currentCategoryUrl = subcategory || category || '';
  const categoryBreadcrumbs: Breadcrumb[] = buildBreadcrumbs(currentCategoryUrl);

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE_FILTER);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [currentCategoryUrl, selectedBrands, selectedColors, minPrice, maxPrice, textQuery]);

  useEffect(() => {
    const currentCategory = CATEGORIES.find((cat) => cat.url === currentCategoryUrl);
    if (currentCategory && currentCategory.ruName) {
      setPageTitle(currentCategory.ruName);
    }

    const getProductsFromServer = async () => {
      try {
        let fetchedProducts: Product[] = [];
        const sortCtParam = SORT_OPTIONS.filter(
          (el: Record<string, string>) => el.value === currentSort
        )[0].ctSort;

        const response = await getProducts(
          currentCategoryUrl,
          currentPage,
          sortCtParam,
          selectedBrands,
          selectedColors,
          minPrice,
          maxPrice,
          textQuery
        );
        if (response.total === 0) {
          setTotalPages(0);
        } else {
          fetchedProducts = response.results.map((el) => mapProduct(el));
          setTotalPages(Math.ceil(response.total / PRODUCTS_ON_PAGE));
          // console.log(fetchedProducts);
        }
        setProducts(fetchedProducts);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      }
    };
    getProductsFromServer();
  }, [
    currentCategoryUrl,
    selectedBrands,
    selectedColors,
    currentPage,
    currentSort,
    minPrice,
    maxPrice,
    textQuery,
  ]);

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
          <ToastContainer />
          <div className="filters">
            <div className="filters__container">
              <BrandFilter
                selectedBrands={selectedBrands}
                onBrandChange={(brands) => {
                  handleBrandChange(brands);
                }}
              />
              <ColorFilter
                selectedColors={selectedColors}
                onColorChange={(colors) => {
                  handleColorChange(colors);
                }}
              />
              <PriceRangeFilter
                onPriceChange={handlePriceChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>

            <SelectedFilters
              selectedFilters={[...selectedBrands, ...selectedColors]}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onOptionChange={(selectedOption) => {
                if (selectedBrands.includes(selectedOption)) {
                  const updatedBrands = selectedBrands.filter((brand) => brand !== selectedOption);
                  setSelectedBrands(updatedBrands);
                } else if (selectedColors.includes(selectedOption)) {
                  const updatedColors = selectedColors.filter((color) => color !== selectedOption);
                  setSelectedColors(updatedColors);
                }
              }}
              onPriceChange={handlePriceChange}
              onResetSelectedFilters={handleResetFilters}
            />
          </div>
          <SearchInput onSearch={(searchText: string) => handleSearchChange(searchText)} />
          <Sorting onSortChange={handleSortChange} />
          {products.length === 0 ? (
            <p className="no-product">Нет продуктов, удовлетворяющих заданным условиям</p>
          ) : (
            <ProductList products={products} />
          )}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              initialPage={currentPage}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              previousLabel="Назад"
              nextLabel="Вперед"
              activeClassName="active"
              disabledClassName="disabled"
            />
          )}
        </div>
      </div>
    </>
  );
};

export { CatalogContent };
