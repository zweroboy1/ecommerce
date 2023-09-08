import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Cart } from '../pages/main/header/Cart';

describe('Cart component', () => {
  it('renders a link to the Cart page', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
  });
});
