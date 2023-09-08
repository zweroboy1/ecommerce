import { render, fireEvent, screen } from '@testing-library/react';
import { BrandFilter } from '../components/BrandFilter';

describe('BrandFilter', () => {
  it('renders the BrandFilter component', () => {
    const selectedBrands = ['Xiaomi', 'Samsung'];
    const onBrandChange = jest.fn();
    const onReset = jest.fn();

    render(
      <BrandFilter
        selectedBrands={selectedBrands}
        onBrandChange={onBrandChange}
        onReset={onReset}
      />
    );

    // Заголовок отображается
    expect(screen.getByText('Бренд')).toBeInTheDocument();

    // Изменение выбора бренда
    fireEvent.click(screen.getByText('Apple'));

    // Выбранные бренды отображаются на основе данных из selectedBrands
    expect(screen.getByText('Xiaomi')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();

    // Сброс
    fireEvent.click(screen.getByText('Сбросить'));

    // onReset вызывается
    expect(onReset).toHaveBeenCalled();
  });
});
