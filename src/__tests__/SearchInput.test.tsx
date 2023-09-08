import { render, fireEvent, screen } from '@testing-library/react';
import { SearchInput } from '../components/SearchInput';

describe('SearchInput', () => {
  it('renders the SearchInput component', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    // Элементы компонента отображаются
    expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Ввод текста и нажатие кнопки поиска
    const inputElement = screen.getByPlaceholderText('Поиск...');
    const searchButton = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    // Функция onSearch вызывается с правильным аргументом
    expect(onSearchMock).toHaveBeenCalledWith('test search');
  });

  it('triggers search on Enter key press', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    // Ввод текста и нажатие клавиши Enter
    const inputElement = screen.getByPlaceholderText('Поиск...');
    fireEvent.change(inputElement, { target: { value: 'test search' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    // Функция onSearch вызывается с правильным аргументом
    expect(onSearchMock).toHaveBeenCalledWith('test search');
  });
});
