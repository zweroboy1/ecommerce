import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsAll } from '../pages/other/PromotionsAll';

describe('PromotionsAll component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <PromotionsAll />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Все акции' });
    expect(mainHeading).toBeInTheDocument();
  });
});
