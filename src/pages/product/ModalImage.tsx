import React from 'react';

interface ModalImageProps {
  imageUrl: string;
  onClose: () => void;
}

const ModalImage: React.FC<ModalImageProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <img src={imageUrl} alt="Product" />
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export { ModalImage };
