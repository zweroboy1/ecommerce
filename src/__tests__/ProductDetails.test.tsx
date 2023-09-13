import { render, screen } from '@testing-library/react';
import { ProductDetails } from '../pages/product/ProductDetails';

describe('ProductDetails', () => {
  const defaultProps = {
    id: '1',
    price: 1000,
    discountedPrice: 800,
    brand: 'Пример Бренда',
    color: 'Синий',
    sku: 'ABC123',
  };

  it('отображает детали продукта правильно', () => {
    render(<ProductDetails {...defaultProps} />);

    // Проверка отображения SKU
    const skuElement = screen.getByText('КОД:');
    expect(skuElement).toBeInTheDocument();

    // Проверка отображения бренда
    const brandElement = screen.getByText('Бренд:');
    expect(brandElement).toBeInTheDocument();

    // Проверка отображения цвета
    const colorElement = screen.getByText('Цвет:');
    expect(colorElement).toBeInTheDocument();

    // Проверка отображения кнопки "В корзину"
    const addToCartButton = screen.getByRole('button', { name: 'В корзину' });
    expect(addToCartButton).toBeInTheDocument();
  });
});
