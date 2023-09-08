import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AllOrders } from '../pages/other/AllOrders';

describe('AllOrders component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <AllOrders />
      </MemoryRouter>
    );

    const mainHeading = screen.getByRole('heading', { name: 'Все заказы' });
    expect(mainHeading).toBeInTheDocument();
  });
});
