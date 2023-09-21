import { buildBreadcrumbs } from '../utils/buildBreadcrumbs';

jest.mock('../constants/categories', () => ({
  CATEGORIES: [
    {
      id: 1,
      ruName: 'Категория 1',
      url: 'category-1',
      parentId: null,
    },
    {
      id: 2,
      ruName: 'Категория 2',
      url: 'category-2',
      parentId: 1,
    },
    {
      id: 3,
      ruName: 'Категория 3',
      url: 'category-3',
      parentId: 2,
    },
  ],
}));

describe('buildBreadcrumbs', () => {
  it('should return default breadcrumbs for an unknown category', () => {
    const categoryUrl = 'unknown-category';
    const result = buildBreadcrumbs(categoryUrl);
    expect(result).toEqual([
      {
        id: 1,
        name: 'Каталог',
        url: '',
      },
    ]);
  });

  it('should return default breadcrumbs when no category URL is provided', () => {
    const result = buildBreadcrumbs('');
    expect(result).toEqual([
      {
        id: 1,
        name: 'Каталог',
        url: '',
      },
    ]);
  });
});
