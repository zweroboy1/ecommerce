interface SortingProps {
  onSortChange: (newSort: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'priceAsc', label: 'По цене (возрастающая)' },
    { value: 'priceDesc', label: 'По цене (убывающая)' },
    { value: 'nameAsc', label: 'По имени (A-Z)' },
    { value: 'nameDesc', label: 'По имени (Z-A)' },
  ];

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    onSortChange(newSort);
  };

  return (
    <div className="sorting">
      <label htmlFor="sort">Сортировать по:</label>
      <select id="sort" onChange={handleSortChange}>
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
