import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Payment } from '../pages/other/Payment';

describe('Payment component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Payment />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Доставка и оплата' });
    expect(mainHeading).toBeInTheDocument();
  });
});
