import React, { useState } from 'react';

interface SearchInputProps {
  onSearch: (searchText: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    if (!event.target.value.trim()) {
      onSearch(event.target.value.trim());
    }
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchText);
    }
  };

  return (
    <div className="search-directory">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} tabIndex={-1}></button>
    </div>
  );
};

export { SearchInput };
