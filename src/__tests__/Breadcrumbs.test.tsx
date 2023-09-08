import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';

describe('Breadcrumbs component', () => {
  it('displays home link when no breadcrumbs provided', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs breadcrumbs={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });

  it('displays a single breadcrumb', () => {
    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs breadcrumbs={[{ id: 1, name: 'Категория', url: 'category' }]} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('displays multiple breadcrumbs', () => {
    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs
          breadcrumbs={[
            { id: 1, name: 'Категория', url: 'category' },
            { id: 2, name: 'Товар', url: 'product' },
          ]}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('generates correct links', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs
          breadcrumbs={[
            { id: 1, name: 'Категория', url: 'category' },
            { id: 2, name: 'Товар', url: 'product' },
          ]}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Товар')).toBeInTheDocument();
  });
});
