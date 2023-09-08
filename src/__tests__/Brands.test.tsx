import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Brands } from '../pages/other/Brands';

describe('Brands component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Brands />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Торговые марки' });
    expect(mainHeading).toBeInTheDocument();
  });
});
