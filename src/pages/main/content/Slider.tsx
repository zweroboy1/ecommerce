import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PROMOTIONS_ROUTE } from '../../../constants/route';

interface SliderProps {
  items: React.ReactNode[];
  slideWidth: number;
  slideMargin: number;
}

const Slider: React.FC<SliderProps> = ({ items, slideWidth, slideMargin }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [totalImages, setTotalImages] = useState(items.length);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const updateSlider = () => {
      const screenWidth = window.innerWidth;

      let newSlideCount = Math.floor(screenWidth / (slideWidth + slideMargin + 20));
      newSlideCount = Math.min(newSlideCount, 4);

      const newSliderWidth = newSlideCount * (slideWidth + slideMargin);
      setSliderWidth(newSliderWidth);
      setTotalImages(items.length - (newSlideCount - 1));
    };

    updateSlider();

    const handleResize = () => {
      updateSlider();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slideWidth, slideMargin, items]);

  const goToPrevSlide = () => {
    const newStartIndex = (startIndex - 1 + totalImages) % totalImages;
    setStartIndex(newStartIndex);
  };

  const goToNextSlide = () => {
    const newStartIndex = (startIndex + 1) % totalImages;
    setStartIndex(newStartIndex);
  };

  const slideTransform = {
    transform: `translateX(-${startIndex * (slideWidth + slideMargin)}px)`,
  };

  return (
    <div className="promotions__body slider-container container">
      <div className="promotions__buttons slider-buttons">
        <button className="promotions__prev slider-prev" onClick={goToPrevSlide}></button>
        <button className="promotions__next slider-next" onClick={goToNextSlide}></button>
      </div>
      <div className="promotions__scroller slider-main">
        <div
          className="promotions__scroller-list slider__scroll"
          style={{ ...slideTransform, width: `${sliderWidth}px` }}
        >
          {items.map((item, index) => (
            <div className="promotions__item slide" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="promotions__button">
        <NavLink className="button" to={PROMOTIONS_ROUTE} title="">
          Все промо-акции
        </NavLink>
      </div>
    </div>
  );
};

export default Slider;
