import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Cart } from '../pages/other/Cart';

describe('Cart component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Корзина' });
    expect(mainHeading).toBeInTheDocument();
  });
});
