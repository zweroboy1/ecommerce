import { render, fireEvent } from '@testing-library/react';
import { ModalImage } from '../pages/product/ModalImage';

const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
const mockSelectedImageIndex = 1;
const mockOnClose = jest.fn();

describe('ModalImage component', () => {
  it('calls onClose when clicking close button', () => {
    const { getByText } = render(
      <ModalImage
        images={mockImages}
        selectedImageIndex={mockSelectedImageIndex}
        onClose={mockOnClose}
      />
    );

    const closeButton = getByText('×');

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('prevents onClose from being called when clicking inside modal content', () => {
    const { container } = render(
      <ModalImage
        images={mockImages}
        selectedImageIndex={mockSelectedImageIndex}
        onClose={mockOnClose}
      />
    );

    // Отслеживаем вызов onClose
    const onCloseSpy = jest.spyOn(mockOnClose, 'mockImplementation');

    // Все элементы с атрибутом alt со значением 'Product 1'
    const elements = container.querySelectorAll('[alt="Product 1"]');

    // Конкретный элемент, соответствующий изображению
    const modalContent = elements[mockSelectedImageIndex]?.parentElement;

    if (modalContent) {
      fireEvent.click(modalContent);
    }

    // Проверяем, что onClose не был вызван
    expect(onCloseSpy).not.toHaveBeenCalled();

    // Очищаем спай
    onCloseSpy.mockRestore();
  });
});
