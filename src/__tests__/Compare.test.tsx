import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Compare } from '../pages/Compare';

describe('Compare component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Compare />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Список сравнения' });
    expect(mainHeading).toBeInTheDocument();
  });
});
