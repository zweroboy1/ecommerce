import { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

interface ModalImageProps {
  images: string[];
  selectedImageIndex: number;
  onClose: () => void;
}

const ModalImage: React.FC<ModalImageProps> = ({ images, selectedImageIndex, onClose }) => {
  const carouselRef = useRef(null);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <Carousel selectedItem={selectedImageIndex} ref={carouselRef}>
          {images.map((imageUrl, index) => (
            <div key={index} className="carousel-image">
              <img src={imageUrl} alt={`Product ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export { ModalImage };
