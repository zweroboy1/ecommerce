import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Wishlist } from '../pages/main/header/Wishlist';

describe('Wishlist component', () => {
  it('renders a link to the Saved page', () => {
    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );
  });
});
