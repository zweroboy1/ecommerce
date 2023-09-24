import { render, fireEvent, screen } from '@testing-library/react';
import { ColorFilter } from '../components/ColorFilter';
import { COLORS } from '../constants';

describe('ColorFilter', () => {
  it('renders the ColorFilter component', () => {
    const selectedColors = ['black', 'blue'];
    const onColorChange = jest.fn();
    const onReset = jest.fn();

    render(
      <ColorFilter
        selectedColors={selectedColors}
        onColorChange={onColorChange}
        onReset={onReset}
      />
    );

    // Заголовок отображается
    expect(screen.getByText('Цвет')).toBeInTheDocument();

    // Выбранные цвета отображаются с использованием текстовых значений цветов из COLORS
    expect(screen.getByText(COLORS.black)).toBeInTheDocument();
    expect(screen.getByText(COLORS.blue)).toBeInTheDocument();

    // Сброс
    fireEvent.click(screen.getByText('Сбросить'));

    // onReset вызывается
    expect(onReset).toHaveBeenCalled();
  });
});
