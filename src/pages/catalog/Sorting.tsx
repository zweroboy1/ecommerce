import { useState } from 'react';

type SortingProps = {
  onSortChange: (value: string) => void;
};

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('default');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedSort(value);
    onSortChange(value);
  };

  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'priceAsc', label: 'По цене (возрастающая)' },
    { value: 'priceDesc', label: 'По цене (убывающая)' },
    { value: 'nameAsc', label: 'По имени (A-Z)' },
    { value: 'nameDesc', label: 'По имени (Z-A)' },
  ];

  return (
    <div className="sorting">
      <label htmlFor="sortSelect">Сортировать по:</label>
      <select
        className="sorting__select"
        id="sortSelect"
        value={selectedSort}
        onChange={handleSortChange}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Sorting };
