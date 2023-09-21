import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Notification from '../components/Notification';

describe('Notification component', () => {
  it('renders the notification content correctly', () => {
    const onCloseMock = jest.fn();

    render(
      <MemoryRouter>
        <Notification
          onClose={onCloseMock}
          productName="Product Name"
          productPrice={100}
          discontPrice={90}
          productImage="image.jpg"
          productSlug="product-slug"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Товар добавлен в корзину')).toBeInTheDocument();

    const productNameLink = screen.getByText('Product Name');
    expect(productNameLink).toBeInTheDocument();
    expect(productNameLink).toHaveAttribute('href', '/product/product-slug');

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('90.00 ₴')).toBeInTheDocument();

    const continueShoppingButton = screen.getByText('Продолжить покупки');
    expect(continueShoppingButton).toBeInTheDocument();
    fireEvent.click(continueShoppingButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    const addToCartButton = screen.getByText('В корзину');
    expect(addToCartButton).toBeInTheDocument();
    fireEvent.click(addToCartButton);
  });
});
