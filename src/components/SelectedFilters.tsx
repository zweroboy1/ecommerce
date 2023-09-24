import React from 'react';
import { COLORS, MAX_PRICE_FILTER } from '../constants';

type SelectedFiltersProps = {
  selectedFilters: string[];
  onOptionChange: (option: string) => void;
  onResetSelectedFilters: () => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
};

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  selectedFilters,
  onOptionChange,
  onResetSelectedFilters,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const handleResetAll = () => {
    onResetSelectedFilters();
    onPriceChange(0, MAX_PRICE_FILTER);
  };

  return (
    <div className="filters__selected">
      <ul className="filters__selected-list">
        {selectedFilters.map((selectedOption, index) => (
          <li key={index} className="filters__selected-item">
            {COLORS[selectedOption] || selectedOption}
            <div
              className="filters__selected-close close"
              onClick={() => onOptionChange(selectedOption)}
            >
              <span></span>
              <span></span>
            </div>
          </li>
        ))}
      </ul>
      {minPrice !== 0 || maxPrice !== MAX_PRICE_FILTER ? (
        <div className="filters__selected-item">
          Цена: {minPrice} - {maxPrice}
          <div
            className="filters__selected-close close"
            onClick={() => {
              onPriceChange(0, MAX_PRICE_FILTER);
            }}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      ) : null}
      {(selectedFilters.length > 0 || minPrice !== 0 || maxPrice !== MAX_PRICE_FILTER) && (
        <a className="filters__selected-reset reset" onClick={handleResetAll}>
          Сбросить все
          <i className="reset__icon"></i>
        </a>
      )}
    </div>
  );
};

export default SelectedFilters;
