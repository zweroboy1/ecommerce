import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Return } from '../pages/other/Return';

describe('Return component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Return />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Возврат товара' });
    expect(mainHeading).toBeInTheDocument();
  });
});
