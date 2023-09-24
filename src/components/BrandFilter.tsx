import React from 'react';
import { Filter } from './Filter';
import { BRANDS } from '../constants';

const BrandFilter: React.FC<{
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  onReset?: () => void;
}> = ({ selectedBrands, onBrandChange, onReset }) => {
  const handleReset = () => {
    onBrandChange([]);
    if (onReset) {
      onReset();
    }
  };

  return (
    <Filter
      title="Бренд"
      options={BRANDS}
      selectedOptions={selectedBrands}
      onOptionsChange={onBrandChange}
      onReset={handleReset}
    />
  );
};

export { BrandFilter };
