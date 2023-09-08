import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Account } from '../pages/main/header/Account';

describe('Account component', () => {
  it('renders a link to the Account page', () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );
  });
});
