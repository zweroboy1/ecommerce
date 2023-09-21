import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../pages/About';

describe('About component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'О нас' });
    expect(mainHeading).toBeInTheDocument();
  });
});
