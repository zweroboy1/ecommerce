import { render, fireEvent } from '@testing-library/react';
import SelectedFilters from '../components/SelectedFilters';

describe('SelectedFilters component', () => {
  const mockProps = {
    selectedFilters: ['Red', 'Blue'],
    onOptionChange: jest.fn(),
    onResetSelectedFilters: jest.fn(),
    minPrice: 0,
    maxPrice: 10000,
    onPriceChange: jest.fn(),
  };

  it('renders selected filters and price correctly', () => {
    const { getByText } = render(<SelectedFilters {...mockProps} />);

    expect(getByText('Red')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
    expect(getByText('Цена: 0 - 10000')).toBeInTheDocument();
    expect(getByText('Сбросить все')).toBeInTheDocument();
  });

  it('calls onResetSelectedFilters and onPriceChange when clicking on "Сбросить все" button', () => {
    const { getByText } = render(<SelectedFilters {...mockProps} />);
    fireEvent.click(getByText('Сбросить все'));
    expect(mockProps.onResetSelectedFilters).toHaveBeenCalled();
    expect(mockProps.onPriceChange).toHaveBeenCalledWith(0, 100000);
  });
});
