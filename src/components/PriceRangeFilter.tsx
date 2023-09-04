import React, { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { MAX_PRICE_FILTER } from '../constants';

const PriceRangeFilter: React.FC<{
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}> = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE_FILTER);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [expanded, setExpanded] = useState(false);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  const handleToggleFilter = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onPriceChange(values[0], values[1]);
      timeoutRef.current = null;
    }, 300);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue)) {
      setMinPrice(newValue);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue)) {
      setMaxPrice(newValue);
    }
  };

  const handleResetFilter = () => {
    setMinPrice(0);
    setMaxPrice(MAX_PRICE_FILTER);
    onPriceChange(0, MAX_PRICE_FILTER);
  };

  return (
    <div className={`filters__item ${expanded ? 'open' : ''}`} ref={filtersRef}>
      <div className="filters__header" onClick={handleToggleFilter}>
        Цена
        <i className={`filters__icon ${expanded ? 'arrow-up' : 'arrow-down'}`}></i>
      </div>
      <div className={`filters__content ${expanded ? '' : 'hidden'}`}>
        <div className="filters__price-slider">
          <div className="filters__price-inputs">
            <bdi>
              <span className="filters__price-prefix">UAH</span>
              <input
                type="number"
                min={0}
                max={MAX_PRICE_FILTER}
                value={minPrice}
                onChange={handleMinInputChange}
              />
            </bdi>
            <span>-</span>
            <bdi>
              <span className="filters__price-suffix">UAH</span>
              <input
                type="number"
                min={0}
                max={MAX_PRICE_FILTER}
                value={maxPrice}
                onChange={handleMaxInputChange}
              />
            </bdi>
          </div>
          <Slider
            range
            min={0}
            max={MAX_PRICE_FILTER}
            step={100}
            value={[minPrice, maxPrice]}
            onChange={(values: number | number[]) => {
              if (Array.isArray(values)) {
                const [newMinValue, newMaxValue] = values;
                handleSliderChange([newMinValue, newMaxValue]);
              }
            }}
          />
          <div className="filters__price-labels">
            <span>UAH {minPrice}</span>
            <span>UAH {maxPrice}</span>
          </div>
        </div>
        <div className="filters__reset-block">
          <a className="filters__reset reset" onClick={handleResetFilter}>
            Сбросить
            <i className="reset__icon"></i>
          </a>
        </div>
        <div
          className={`filters__close-button close ${expanded ? '' : 'hidden'}`}
          onClick={handleToggleFilter}
        >
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export { PriceRangeFilter };
