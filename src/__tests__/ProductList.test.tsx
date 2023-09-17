import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductList } from '../components/ProductList.1';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is a product description.',
    slug: 'product-1',
    price: 1000,
    discountedPrice: 800,
    images: ['image1.jpg', 'image2.jpg'],
    brand: 'Brand',
    color: 'Red',
    sku: 'ABC123',
    categories: ['Category 1', 'Category 2'],
  },
];

describe('ProductList component', () => {
  it('renders a list of products', () => {
    const { getByText } = render(
      <Router>
        <ProductList products={mockProducts} />
      </Router>
    );

    const productName = getByText('Product 1');
    expect(productName).toBeInTheDocument();
  });
});
