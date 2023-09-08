import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PickupPoints } from '../pages/other/PickupPoints';

describe('PickupPoints component', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <PickupPoints />
      </MemoryRouter>
    );
    const mainHeading = screen.getByRole('heading', { name: 'Пункты самовывоза' });
    expect(mainHeading).toBeInTheDocument();
  });
});
