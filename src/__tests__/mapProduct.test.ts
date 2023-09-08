import { mapProduct } from '../utils/mapProduct';
import { ProductAllData } from '../types';

const mockProductAllData: ProductAllData = {
  id: '123',
  name: { ru: 'Товар' },
  description: { ru: 'Описание товара' },
  slug: { ru: 'tovar' },
  masterVariant: {
    attributes: [
      { name: 'brand', value: { key: 'BrandName' } },
      { name: 'color', value: { key: 'Red' } },
    ],
    sku: 'SKU123',
    images: [{ url: 'image1.jpg', dimensions: { w: 100, h: 100 } }],
    prices: [
      {
        value: { centAmount: 2000 },
        discounted: { value: { type: 'discount', currencyCode: 'USD', centAmount: 1500 } },
      },
    ],
  },
  categories: [{ id: 'category1' }, { id: 'category2' }],
};

describe('mapProduct function', () => {
  it('maps ProductAllData to Product correctly', () => {
    const mappedProduct = mapProduct(mockProductAllData);

    expect(mappedProduct).toEqual({
      id: '123',
      name: 'Товар',
      description: 'Описание товара',
      slug: 'tovar',
      price: 2000,
      discountedPrice: 1500,
      images: ['image1.jpg'],
      brand: 'BrandName',
      color: 'Red',
      sku: 'SKU123',
      categories: ['category1', 'category2'],
    });
  });
});
