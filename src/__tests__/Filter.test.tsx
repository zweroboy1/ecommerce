import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from '../components/Filter';

describe('Filter component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const title = 'Filter Title';
  const selectedOptions: string[] = [];
  const onOptionsChange = jest.fn();
  const onReset = jest.fn();

  it('renders the title', () => {
    render(
      <Filter
        title={title}
        options={options}
        selectedOptions={selectedOptions}
        onOptionsChange={onOptionsChange}
        onReset={onReset}
      />
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('handles filter reset correctly', () => {
    const initiallySelectedOptions = [options[0]];
    render(
      <Filter
        title={title}
        options={options}
        selectedOptions={initiallySelectedOptions}
        onOptionsChange={onOptionsChange}
        onReset={onReset}
      />
    );

    const resetButton = screen.getByText('Сбросить');

    // Кликаем на кнопку сброса
    fireEvent.click(resetButton);

    // Проверяем, что функция onOptionsChange вызывается с пустым массивом
    expect(onOptionsChange).toHaveBeenCalledWith([]);

    // Проверяем, что функция onReset вызывается
    expect(onReset).toHaveBeenCalled();
  });
});
