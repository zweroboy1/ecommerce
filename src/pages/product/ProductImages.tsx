import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ProductImagesProps } from '../../types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ModalImage } from './ModalImage';

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Индекс выбранной картинки

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Carousel>
        {productImages.map((image, index) => (
          <div key={index} className="product__image" onClick={() => openModal(index)}>
            <img key={index} src={image} alt={`Product ${index}`} />
          </div>
        ))}
      </Carousel>
      {isModalOpen && (
        <ModalImage
          images={productImages}
          selectedImageIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export { ProductImages };
