import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Payment } from '../pages/Payment';

describe('Payment component', () => {
  it('renders the "Доставка и Оплата" page with the correct title', () => {
    render(
      <MemoryRouter>
        <Payment />
      </MemoryRouter>
    );

    const pageTitleElements = screen.getAllByText('Доставка и Оплата');

    expect(pageTitleElements.length).toBeGreaterThan(1);

    const pageTitleInH1 = pageTitleElements.find((element) => element.closest('h1'));
    expect(pageTitleInH1).toBeInTheDocument();
  });
});
