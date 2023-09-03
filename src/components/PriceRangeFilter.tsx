import React, { useState, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { MAX_PRICE_FILTER } from '../constants';

const PriceRangeFilter: React.FC<{
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}> = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE_FILTER);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div>
      <label>Выберите диапазон цен:</label>
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
      <div>
        <span>Мин. цена: {minPrice}</span>
        <span>Макс. цена: {maxPrice}</span>
      </div>
    </div>
  );
};

export { PriceRangeFilter };
