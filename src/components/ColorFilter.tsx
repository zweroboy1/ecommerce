import React, { useState } from 'react';
import { COLORS } from '../constants';

const ColorFilter: React.FC<{
  onColorChange: (colors: string[]) => void;
}> = ({ onColorChange }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const englishColor = event.target.value;
    const isChecked = event.target.checked;

    const updatedSelectedColors = isChecked
      ? [...selectedColors, englishColor]
      : selectedColors.filter((selectedColor) => selectedColor !== englishColor);

    setSelectedColors(updatedSelectedColors);

    onColorChange(updatedSelectedColors);
  };

  return (
    <div>
      <label>Выберите цвета:</label>
      <div>
        {Object.keys(COLORS).map((englishColor, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={englishColor}
              checked={selectedColors.includes(englishColor)}
              onChange={handleColorChange}
            />
            {COLORS[englishColor]}
          </label>
        ))}
      </div>
    </div>
  );
};

export { ColorFilter };
