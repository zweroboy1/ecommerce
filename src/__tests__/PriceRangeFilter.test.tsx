import { render, fireEvent } from '@testing-library/react';
import { PriceRangeFilter } from '../components/PriceRangeFilter';
import { MAX_PRICE_FILTER } from '../constants';

describe('PriceRangeFilter', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <PriceRangeFilter minPrice={0} maxPrice={1000} onPriceChange={() => {}} />
    );

    expect(getByText('Цена')).toBeInTheDocument();
    expect(getByText('Сбросить')).toBeInTheDocument();
  });

  it('calls onPriceChange with 0 and MAX_PRICE_FILTER when reset button is clicked', () => {
    const onPriceChangeMock = jest.fn();
    const { getByText } = render(
      <PriceRangeFilter minPrice={200} maxPrice={800} onPriceChange={onPriceChangeMock} />
    );

    const resetButton = getByText('Сбросить');
    fireEvent.click(resetButton);

    expect(onPriceChangeMock).toHaveBeenCalledWith(0, MAX_PRICE_FILTER);
  });
});
