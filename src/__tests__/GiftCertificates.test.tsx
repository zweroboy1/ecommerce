import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GiftCertificates } from '../pages/other/GiftCertificates';

describe('GiftCertificates component', () => {
  it('renders the correct heading', () => {
    render(
      <MemoryRouter>
        <GiftCertificates />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: 'Подарочные сертификаты' });
    expect(heading).toBeInTheDocument();
  });
});
