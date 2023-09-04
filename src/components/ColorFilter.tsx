import React from 'react';
import { Filter } from './Filter';
import { COLORS } from '../constants';

const ColorFilter: React.FC<{
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  onReset?: () => void;
}> = ({ selectedColors, onColorChange, onReset }) => {
  const handleReset = () => {
    onColorChange([]);
    if (onReset) {
      onReset();
    }
  };

  return (
    <Filter
      title="Цвет"
      options={Object.keys(COLORS)}
      optionsLabel={Object.values(COLORS)}
      selectedOptions={selectedColors}
      onOptionsChange={onColorChange}
      onReset={handleReset}
    />
  );
};

export { ColorFilter };
