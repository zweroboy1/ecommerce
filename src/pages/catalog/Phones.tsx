import { useState } from 'react';
import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { LeftMenu } from './LeftMenu';
import { Filters } from './Filters';
import { Sorting } from './Sorting';
import { Goods } from './Goods';
import { Loader } from './Loader';
import { Pagination } from './Pagination';

const Phones = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  const [currentSort, setCurrentSort] = useState('default');
  const [selectedFilters, setSelectedFilters] = useState({});

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (newSort: string) => {
    setCurrentSort(newSort);
  };

  const handleFilterChange = (filterId: number, value: string | number) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main content">
        <div className="row">
          <h1>Телефоны</h1>
          <Breadcrumbs />
        </div>
        <div className="row catalog">
          <div className="left">
            <LeftMenu />
          </div>
          <div className="right">
            <Filters
              onFilterChange={(filterId, values) => handleFilterChange(filterId, values[0])}
            />
            <Sorting onSortChange={handleSortChange} />
            <Goods currentSort={currentSort} selectedFilters={selectedFilters} />
            <Loader />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Phones };
