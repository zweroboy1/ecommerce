import { useState, useEffect, useRef } from 'react';
import { CatalogMenu } from '../../../components/CatalogMenu';
import { CATEGORIES } from '../../../constants/categories';

const Categories = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuVisible && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div className="menu">
      <div className="menu__title" onClick={handleClick}>
        <i className="menu__icon"></i>
        <span>Категории</span>
      </div>
      <div className={`menu__categories ${menuVisible ? 'active' : ''}`} ref={menuRef}>
        <CatalogMenu categories={CATEGORIES} closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export { Categories };
