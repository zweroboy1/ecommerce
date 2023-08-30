import { useState, useEffect, useRef } from 'react';

type FilterOption = string | number;

type FilterData = {
  id: number;
  name: string;
  options?: FilterOption[];
  min?: number;
  max?: number;
};

type FiltersProps = {
  onFilterChange: (filterId: number, values: FilterOption[]) => void;
};

type ExpandedFilters = {
  [key: number]: boolean;
};

type SelectedFilters = {
  [key: number]: FilterOption[];
};

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const filterData: FilterData[] = [
    {
      id: 1,
      name: 'Бренд',
      options: ['Apple', 'Samsung', 'HTC', 'Nokia', 'Motorola'],
    },
    {
      id: 2,
      name: 'Цвет',
      options: ['Черный', 'Темно-синий', 'Золото', 'Серебро'],
    },
    {
      id: 3,
      name: 'Цена',
      min: 0,
      max: 300,
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({});

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

  const handleToggleFilter = (filterId: number) => {
    setExpandedFilters((prevExpandedFilters) => ({
      ...prevExpandedFilters,
      [filterId]: !prevExpandedFilters[filterId],
    }));
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
                <div className="filters__price-slider">
                  <input
                    type="range"
                    min={filter.min}
                    max={filter.max}
                    step={1}
                    value={
                      selectedFilters[filter.id]
                        ? selectedFilters[filter.id].join(',')
                        : String(filter.min)
                    }
                    onChange={(e) => handleFilterChange(filter.id, [parseInt(e.target.value, 10)])}
                  />
                  <span>От: {selectedFilters[filter.id] || filter.min}</span>
                  <span>До: {filter.max}</span>
                </div>
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
          {Object.entries(selectedFilters).map(([filterId, selectedOptions]) =>
            selectedOptions.map((selectedOption) => (
              <li className="filters__selected-item" key={`${filterId}_${selectedOption}`}>
                {selectedOption}
                <div
                  className="filters__selected-close close"
                  onClick={() => handleRemoveSelectedFilter(Number(filterId))}
                >
                  <span></span>
                  <span></span>
                </div>
              </li>
            ))
          )}
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
