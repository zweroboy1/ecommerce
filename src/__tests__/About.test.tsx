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
    const mainHeading = screen.getByText('О компании');
    expect(mainHeading).toBeInTheDocument();
  });
});
