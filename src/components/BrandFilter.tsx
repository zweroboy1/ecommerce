import React, { useState } from 'react';
import { BRANDS } from '../constants';

const BrandFilter: React.FC<{
  onBrandChange: (brands: string[]) => void;
}> = ({ onBrandChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;

    const updatedSelectedBrands = isChecked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((selectedBrand) => selectedBrand !== brand);

    setSelectedBrands(updatedSelectedBrands);

    onBrandChange(updatedSelectedBrands);
  };

  return (
    <div>
      <label>Выберите бренды:</label>
      <div>
        {BRANDS.map((brand, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={handleBrandChange}
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
};

export { BrandFilter };
