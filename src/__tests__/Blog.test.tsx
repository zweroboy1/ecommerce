import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Blog } from '../pages/other/Blog';

describe('Blog component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Блог' });
    expect(mainHeading).toBeInTheDocument();
  });
});
