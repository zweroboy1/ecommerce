import { render, fireEvent, screen } from '@testing-library/react';
import { ConfirmNotification } from '../components/ConfirmNotification';

describe('ConfirmNotification', () => {
  it('renders without errors', () => {
    const onClose = jest.fn();
    render(<ConfirmNotification onClose={onClose} />);
    expect(
      screen.getByText('Вы уверены, что хотите удалить все товары из корзины?')
    ).toBeInTheDocument();
  });

  it('calls onClose with false when "Отменить" button is clicked', () => {
    const onClose = jest.fn();
    render(<ConfirmNotification onClose={onClose} />);
    fireEvent.click(screen.getByText('Отменить'));
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('calls onClose with true when "Очистить корзину" button is clicked', () => {
    const onClose = jest.fn();
    render(<ConfirmNotification onClose={onClose} />);
    fireEvent.click(screen.getByText('Очистить корзину'));
    expect(onClose).toHaveBeenCalledWith(true);
  });
});
