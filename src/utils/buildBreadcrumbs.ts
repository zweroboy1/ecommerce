import { Breadcrumb } from '../types';
import { CATEGORIES } from '../constants/categories';

const buildBreadcrumbs = (categoryUrl: string, breadcrumbs: Breadcrumb[] = []): Breadcrumb[] => {
  const category = CATEGORIES.find((cat) => cat.url === categoryUrl);
  if (!category) {
    return breadcrumbs.length
      ? breadcrumbs
      : [
          {
            id: 1,
            name: 'Каталог',
            url: '',
          },
        ];
  }

  breadcrumbs.unshift({
    id: category.id,
    name: category.ruName,
    url: category.url,
  });

  if (category.parentId !== null) {
    const parent = CATEGORIES.find((cat) => cat.id === category.parentId);
    if (!parent) {
      return breadcrumbs;
    }
    return buildBreadcrumbs(parent?.url, breadcrumbs);
  }
  return breadcrumbs;
};

export { buildBreadcrumbs };
