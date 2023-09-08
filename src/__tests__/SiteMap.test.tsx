import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteMap } from '../pages/other/SiteMap';

describe('SiteMap component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <SiteMap />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Карта сайта' });
    expect(mainHeading).toBeInTheDocument();
  });
});
