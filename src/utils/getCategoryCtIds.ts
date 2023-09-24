import { Category } from '../types';
import { CATEGORIES } from '../constants/categories';

function getCategoryCtIds(url: string, categories: Category[] = CATEGORIES): string[] {
  const category = categories.find((cat) => cat.url === url);
  if (!category || !category.ctId) {
    return [];
  }

  const childCtIds = categories
    .filter((cat) => cat.parentId === category.id)
    .flatMap((child) => getCategoryCtIds(child.url, categories));

  return [category.ctId, ...childCtIds];
}

export { getCategoryCtIds };
