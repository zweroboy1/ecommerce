import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Saved } from '../pages/other/Saved';

describe('Saved component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Saved />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Отложенные товары' });
    expect(mainHeading).toBeInTheDocument();
  });
});
