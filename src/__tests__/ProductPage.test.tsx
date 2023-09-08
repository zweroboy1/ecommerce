import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProductPage } from '../pages/product/ProductPage';

jest.mock('../services/commercetoolsApi', () => ({
  getProduct: jest.fn(() =>
    Promise.resolve({
      id: '123',
      name: 'Название продукта',
      description: 'Описание продукта',
      slug: 'product-slug',
      price: 100,
      discountedPrice: 90,
      images: ['image1.jpg', 'image2.jpg'],
      brand: 'Бренд',
      color: 'Цвет',
      sku: 'SKU123',
      categories: ['category1', 'category2'],
    })
  ),
}));
jest.mock('../utils/mapProduct', () => ({
  mapProduct: jest.fn((product) => product),
}));

describe('ProductPage', () => {
  it('отображает продукт после успешной загрузки', async () => {
    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Routes>
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Дождемся загрузки продукта (loading исчезнет)
    await waitFor(() => {
      expect(screen.queryByText('Загрузка...')).not.toBeInTheDocument();
    });
  });
});
