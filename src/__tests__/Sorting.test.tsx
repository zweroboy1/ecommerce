import { render, fireEvent } from '@testing-library/react';
import { Sorting } from '../pages/catalog/Sorting';

const mockOnSortChange = jest.fn();

describe('Sorting component', () => {
  it('calls onSortChange with the selected sorting option', () => {
    const { getByLabelText } = render(<Sorting onSortChange={mockOnSortChange} />);

    // Находим выпадающий список
    const sortSelect = getByLabelText('Сортировать по:');

    // Выбираем опцию "По цене (возрастающая)"
    fireEvent.change(sortSelect, { target: { value: 'priceAsc' } });

    // Проверяем, что обработчик вызывается с правильным значением
    expect(mockOnSortChange).toHaveBeenCalledWith('priceAsc');

    // Выбираем другую опцию "По имени (A-Z)"
    fireEvent.change(sortSelect, { target: { value: 'nameAsc' } });

    // Проверяем, что обработчик вызывается с правильным значением
    expect(mockOnSortChange).toHaveBeenCalledWith('nameAsc');
  });
});
