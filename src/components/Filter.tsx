import React, { useState, useEffect, useRef } from 'react';

type FilterProps = {
  title: string;
  options: string[];
  optionsLabel?: string[];
  selectedOptions: string[];
  onOptionsChange: (selectedOptions: string[]) => void;
  onReset?: () => void;
};

const Filter: React.FC<FilterProps> = ({
  title,
  options,
  optionsLabel,
  selectedOptions,
  onOptionsChange,
  onReset,
}) => {
  const [expanded, setExpanded] = useState(false);

  const filtersRef = useRef<HTMLDivElement | null>(null);

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

  const handleToggleFilter = () => {
    setExpanded(!expanded);
  };

  const handleOptionChange = (option: string) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    onOptionsChange(updatedSelectedOptions);
  };

  const handleResetFilter = () => {
    onOptionsChange([]);
    setExpanded(false);

    if (onReset) {
      onReset();
    }
  };

  return (
    <div className={`filters__item ${expanded ? 'open' : ''}`} ref={filtersRef}>
      <div className="filters__header" onClick={handleToggleFilter}>
        {title}
        <i className={`filters__icon ${expanded ? 'arrow-up' : 'arrow-down'}`}></i>
      </div>
      <div className={`filters__content ${expanded ? '' : 'hidden'}`}>
        <ul className="filters__list">
          {options.map((option, index) => (
            <li key={index} className="filters__checkbox-list">
              <input
                className="filters__checkbox"
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              <span>{optionsLabel ? optionsLabel[index] : option}</span>
            </li>
          ))}
        </ul>
        {selectedOptions.length > 0 && (
          <div className="filters__reset-block">
            <a className="filters__reset reset" onClick={handleResetFilter}>
              Сбросить
              <i className="reset__icon"></i>
            </a>
          </div>
        )}
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

export { Filter };
