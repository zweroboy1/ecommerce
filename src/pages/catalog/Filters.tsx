import { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import { filterData } from '../../constants/filters';
import 'rc-slider/assets/index.css';

type FilterOption = string | number;

type FiltersProps = {
  onFilterChange: (filterId: number, values: FilterOption[]) => void;
};

type SelectedFilters = {
  [key: number]: FilterOption[];
};

type ExpandedFilters = {
  [key: number]: boolean;
};

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({});
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(filterData[2]?.max || 100);

  const filtersRef = useRef<HTMLDivElement | null>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
      setExpandedFilters({});
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleFilterChange = (filterId: number, values: FilterOption[]) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: values,
    }));
    onFilterChange(filterId, values);
  };

  // const handleToggleFilter = (filterId: number) => {
  //   setExpandedFilters((prevExpandedFilters) => ({
  //     ...prevExpandedFilters,
  //     [filterId]: !prevExpandedFilters[filterId],
  //   }));
  // };

  const handleToggleFilter = (filterId: number) => {
    setExpandedFilters((prevExpandedFilters) => {
      const updatedExpandedFilters: ExpandedFilters = { ...prevExpandedFilters };
      // Закрыть предыдущий открытый фильтр, если таковой есть
      Object.keys(updatedExpandedFilters).forEach((key) => {
        const parsedKey = parseInt(key, 10);
        if (!Number.isNaN(parsedKey) && parsedKey !== filterId) {
          updatedExpandedFilters[parsedKey] = false;
        }
      });
      // Открыть/закрыть текущий фильтр
      updatedExpandedFilters[filterId] = !updatedExpandedFilters[filterId];
      return updatedExpandedFilters;
    });
  };

  const handleRemoveSelectedFilter = (filterId: number) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterId];
      return newFilters;
    });
    onFilterChange(filterId, []);
  };

  const handleResetAllFilters = () => {
    setSelectedFilters({});
    setExpandedFilters({});
    filterData.forEach((filter) => {
      onFilterChange(filter.id, []);
    });
  };

  const handleResetFilters = (filterId: number) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterId];
      return newFilters;
    });
    setExpandedFilters((prevExpandedFilters) => ({
      ...prevExpandedFilters,
      [filterId]: false,
    }));
    onFilterChange(filterId, []);
  };

  const hasSelectedFilters = Object.keys(selectedFilters).length > 0;

  const handlePriceFilterChange = (filterId: number, newMinValue: number, newMaxValue: number) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: [newMinValue, newMaxValue],
    }));
    onFilterChange(filterId, [newMinValue, newMaxValue]);
  };

  const handlePriceSliderChange = (newMinValue: number, newMaxValue: number) => {
    setMinValue(newMinValue);
    setMaxValue(newMaxValue);
    handlePriceFilterChange(3, newMinValue, newMaxValue);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue)) {
      setMinValue(newValue);
      handlePriceFilterChange(3, newValue, maxValue);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue)) {
      setMaxValue(newValue);
      handlePriceFilterChange(3, minValue, newValue);
    }
  };

  // Функция для вывода информации о фильтрах и сортировке
  const logFilterInfo = () => {
    const filterInfo = {
      brand: selectedFilters[1] || [],
      color: selectedFilters[2] || [],
      // sort: currentSort,
      priceMin: minValue,
      priceMax: maxValue,
      // pageNumber: 2, // текущий номер страницы
    };
    // eslint-disable-next-line no-console
    console.log(filterInfo);
  };

  logFilterInfo();

  const renderFilters = () => {
    return (
      <div className="filters__container">
        {filterData.map((filter) => (
          <div
            key={filter.id}
            className={`filters__item ${expandedFilters[filter.id] ? 'open' : ''}`}
          >
            <div
              id={`sw_elm_filter_${filter.id}`}
              className="filters__header"
              onClick={() => handleToggleFilter(filter.id)}
            >
              {filter.name}
              <i
                className={`filters__icon ${
                  expandedFilters[filter.id] ? 'arrow-up' : 'arrow-down'
                }`}
              ></i>
            </div>
            <div
              id={`elm_filter_${filter.id}`}
              className={`filters__content ${expandedFilters[filter.id] ? '' : 'hidden'}`}
            >
              {filter.options ? (
                <ul className="filters__list">
                  {filter.options.map((option, index) => (
                    <li key={index} className="filters__checkbox-list">
                      <input
                        className="filters__checkbox"
                        type="checkbox"
                        name={`product_filters[${filter.id}]`}
                        data-ca-filter-id={filter.id}
                        value={option}
                        id={`elm_checkbox_${filter.id}_${index}`}
                        checked={
                          selectedFilters[filter.id]
                            ? selectedFilters[filter.id].includes(option)
                            : false
                        }
                        onChange={() => {
                          const newValue = selectedFilters[filter.id]?.includes(option)
                            ? selectedFilters[filter.id]?.filter((item) => item !== option)
                            : [...(selectedFilters[filter.id] || []), option];

                          handleFilterChange(filter.id, newValue);
                        }}
                      />
                      <label htmlFor={`elm_checkbox_${filter.id}_${index}`}>
                        <span>{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                filter.min !== undefined &&
                filter.max !== undefined && (
                  <div className="filters__price-slider">
                    <div className="filters__price-inputs">
                      <bdi>
                        <span className="filters__price-prefix">$</span>
                        <input
                          type="number"
                          min={filter.min}
                          max={filter.max}
                          value={minValue}
                          onChange={handleMinInputChange}
                        />
                      </bdi>
                      <span>-</span>
                      <bdi>
                        <span className="filters__price-suffix">$</span>
                        <input
                          type="number"
                          min={filter.min}
                          max={filter.max}
                          value={maxValue}
                          onChange={handleMaxInputChange}
                        />
                      </bdi>
                    </div>
                    <Slider
                      range
                      min={filter.min}
                      max={filter.max}
                      value={[minValue, maxValue]}
                      onChange={(values: number | number[]) => {
                        if (Array.isArray(values)) {
                          const [newMinValue, newMaxValue] = values;
                          handlePriceSliderChange(newMinValue, newMaxValue);
                        }
                      }}
                    />
                    <div className="filters__price-labels">
                      <span>${filter.min}</span>
                      <span>${filter.max}</span>
                    </div>
                  </div>
                )
              )}
              <div className="filters__reset-block">
                <a className="filters__reset reset" onClick={() => handleResetFilters(filter.id)}>
                  Сбросить
                  <i className="reset__icon"></i>
                </a>
              </div>
              <div
                className={`filters__close-button close ${
                  expandedFilters[filter.id] ? '' : 'hidden'
                }`}
                onClick={() => handleToggleFilter(filter.id)}
              >
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSelectedFilters = () => {
    return (
      <div className="filters__selected">
        <ul className="filters__selected-list">
          {Object.entries(selectedFilters).map(([filterId, selectedOptions]) => {
            const selectedFilter = filterData.find((filter) => filter.id === Number(filterId));
            const filterName = selectedFilter ? selectedFilter.name : '';

            let selectedValue = '';
            if (
              selectedFilter &&
              selectedFilter.min !== undefined &&
              selectedFilter.max !== undefined
            ) {
              selectedValue = `${selectedOptions[0]} - ${selectedOptions[1]}`;
            } else {
              selectedValue = selectedOptions.join(', ');
            }

            return (
              <li className="filters__selected-item" key={`${filterId}_${selectedOptions}`}>
                {filterName}: {selectedValue}
                <div
                  className="filters__selected-close close"
                  onClick={() => handleRemoveSelectedFilter(Number(filterId))}
                >
                  <span></span>
                  <span></span>
                </div>
              </li>
            );
          })}
        </ul>
        {hasSelectedFilters && (
          <a className="filters__selected-reset reset" onClick={handleResetAllFilters}>
            Сбросить
            <i className="reset__icon"></i>
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="filters" ref={filtersRef}>
      {renderFilters()}
      {renderSelectedFilters()}
    </div>
  );
};

export { Filters };
