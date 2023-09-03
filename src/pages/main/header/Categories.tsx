import { useState } from 'react';
import { CatalogMenu } from '../../../components/CatalogMenu';
import { CATEGORIES } from '../../../constants/categories';

const Categories = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // const closeMenu = () => {
  //   setMenuVisible(false);
  // };

  return (
    <div className="menu">
      <div className="menu__title" onClick={toggleMenu}>
        <i className="menu__icon"></i>
        <span>Категории</span>
      </div>
      <div className={`menu__categories ${menuVisible ? 'active' : ''}`}>
        <CatalogMenu categories={CATEGORIES} />
      </div>
    </div>
  );
};

export { Categories };
