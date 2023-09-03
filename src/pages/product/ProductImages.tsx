import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ProductImagesProps } from '../../types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ModalImage } from './ModalImage';

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setIsModalOpen(false);
  };

  return (
    <div>
      <Carousel>
        {productImages.map((image, index) => (
          <div key={index} className="product__image" onClick={() => openModal(image)}>
            <img key={index} src={image} alt={`Product ${index}`} />
          </div>
        ))}
      </Carousel>
      {isModalOpen && <ModalImage imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export { ProductImages };
