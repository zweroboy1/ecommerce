import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotificationCart from '../components/NotificationCart';
import { CATALOG_ROUTE } from '../constants/route';

describe('NotificationCart component', () => {
  it('renders the notification content correctly', () => {
    const onCloseMock = jest.fn();

    render(
      <MemoryRouter>
        <NotificationCart onClose={onCloseMock} />
      </MemoryRouter>
    );

    expect(screen.getByText('Ваш заказ очень важен для нас!')).toBeInTheDocument();

    const continueShoppingButton = screen.getByText('Продолжить покупки');
    expect(continueShoppingButton).toBeInTheDocument();
    fireEvent.click(continueShoppingButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    const catalogButton = screen.getByText('В каталог');
    const catalogLink = catalogButton.closest('a');
    expect(catalogLink).toBeInTheDocument();
    expect(catalogLink).toHaveAttribute('href', CATALOG_ROUTE);
  });
});
