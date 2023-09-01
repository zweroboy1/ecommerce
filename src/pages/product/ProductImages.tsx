import { Carousel } from 'react-responsive-carousel';
import { ProductImagesProps } from '../../types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
  return (
    <Carousel>
      {productImages.map((image, index) => (
        <div key={index} className="product__image">
          <img key={index} src={image} alt={`Product ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export { ProductImages };
