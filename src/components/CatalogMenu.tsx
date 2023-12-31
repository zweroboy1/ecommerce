import { NavLink } from 'react-router-dom';
import { Category } from '../types';

interface CatalogMenuProps {
  categories: Category[];
  closeMenu?: () => void;
}

const CatalogMenu = ({ categories, closeMenu }: CatalogMenuProps) => {
  const categoriesFirstLevel = categories
    .filter((category) => {
      const parentCategory = categories.find((c) => c.id === category.parentId);
      return parentCategory && parentCategory.parentId === null;
    })
    .map((category) => category.id);

  const renderSubCategories = (category: string, subCategories: Category[]) => {
    if (!subCategories.length) {
      return '';
    }
    return (
      <ul className="catalog-menu__subcategory">
        {subCategories.map((subCategory) => (
          <li key={subCategory.id}>
            <NavLink to={`/catalog/${category}/${subCategory.url}`}>{subCategory.ruName}</NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ul className="catalog-menu">
      {categories
        .filter((cat) => cat.parentId === null || !categoriesFirstLevel.includes(cat.parentId))
        .map((category) => (
          <li
            key={category.id}
            className="catalog-menu__category-list"
            onClick={() => {
              if (closeMenu) {
                closeMenu(); // Закрыть меню, если closeMenu определена
              }
            }}
          >
            <NavLink className="catalog-menu__category" to={`/catalog/${category.url}`}>
              {category.ruName}
            </NavLink>
            {category.parentId !== null &&
              renderSubCategories(
                category.url,
                categories.filter((subCategory) => subCategory.parentId === category.id)
              )}
          </li>
        ))}
    </ul>
  );
};

export { CatalogMenu };
