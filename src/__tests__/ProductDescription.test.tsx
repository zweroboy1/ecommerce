import { render } from '@testing-library/react';
import { ProductDescription } from '../pages/product/ProductDescription';

describe('ProductDescription component', () => {
  it('renders product description correctly', () => {
    const description = 'Это описание товара.';

    const { getByText } = render(<ProductDescription description={description} />);

    // Проверяем, что заголовок "Описание товара" отображается на странице
    expect(getByText('Описание товара')).toBeInTheDocument();

    // Проверяем, что текст описания товара отображается на странице
    expect(getByText(description)).toBeInTheDocument();
  });
});
