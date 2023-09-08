import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ComparedProducts } from '../pages/main/header/ComparedProducts';

describe('ComparedProducts component', () => {
  it('renders a link to the Compared Products page', () => {
    render(
      <MemoryRouter>
        <ComparedProducts />
      </MemoryRouter>
    );
  });
});
