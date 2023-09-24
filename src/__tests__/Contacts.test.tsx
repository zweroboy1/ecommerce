import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Contacts } from '../pages/Contacts';

describe('Contacts component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Contacts />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Обратная связь' });
    expect(mainHeading).toBeInTheDocument();
  });
});
