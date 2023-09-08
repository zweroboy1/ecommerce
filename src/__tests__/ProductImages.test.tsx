import { render } from '@testing-library/react';
import { ProductImages } from '../pages/product/ProductImages';

const productImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

describe('ProductImages Component', () => {
  it('renders a carousel with images', () => {
    render(<ProductImages productImages={productImages} />);
  });
});
