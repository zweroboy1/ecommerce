import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartIcon } from '../pages/main/header/CartIcon';

describe('Cart component', () => {
  it('renders a link to the Cart page', () => {
    render(
      <MemoryRouter>
        <CartIcon />
      </MemoryRouter>
    );
  });
});
