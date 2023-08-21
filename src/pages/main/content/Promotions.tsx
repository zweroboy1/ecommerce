import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PROMOTIONS_ROUTE } from '../../../constants/route';
import promotion1 from '../../../assets/img/promotion1.png';
import promotion2 from '../../../assets/img/promotion2.png';
import promotion3 from '../../../assets/img/promotion3.png';
import promotion4 from '../../../assets/img/promotion4.png';

const promotionsData = [
  {
    image: promotion1,
    endDate: new Date('2023-08-30'),
    description: 'Бесплатная доставка на заказ от 1000 грн.',
  },
  {
    image: promotion2,
    endDate: new Date('2023-09-05'),
    description: 'Гоночный картинг + двухлетняя лицензия на гонки K1',
  },
  {
    image: promotion3,
    endDate: new Date('2023-09-10'),
    description: 'Весь месяц черная пятница',
  },
  {
    image: promotion4,
    endDate: new Date('2023-09-20'),
    description: 'Купите фотоаппарат известного бренда со скидкой - 20%',
  },
];

const Promotions = () => {
  const getCurrentDate = (): Date => new Date();

  const calculateDaysRemaining = (endDate: Date): number => {
    const currentDate = getCurrentDate();
    const timeDiff = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const slideWidth = 300;
  const slideMargin = 10;

  const [startIndex, setStartIndex] = useState(0);
  const [totalImages, setTotalImages] = useState(promotionsData.length);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const updateSlider = () => {
      const screenWidth = window.innerWidth;

      let newSlideCount = Math.floor(screenWidth / (slideWidth + slideMargin));
      newSlideCount = Math.min(newSlideCount, 4);

      const newSliderWidth = newSlideCount * (slideWidth + slideMargin) + slideMargin;
      setSliderWidth(newSliderWidth);
      setTotalImages(promotionsData.length - (newSlideCount - 1));
    };

    updateSlider();

    const handleResize = () => {
      updateSlider();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slideWidth, slideMargin]);

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
    <div className="promotions">
      <div className="row">
        <div className="promotions__container">
          <div className="promotions__title">Действующие акции</div>
          <div className="promotions__body slider-container container">
            <div className="promotions__buttons slider-buttons">
              <button className="promotions__prev slider-prev" onClick={goToPrevSlide}></button>
              <button className="promotions__next slider-next" onClick={goToNextSlide}></button>
            </div>
            <div className="promotions__scroller slider">
              <div
                className="promotions__scroller-list slider__scroll"
                style={{ ...slideTransform, width: `${sliderWidth}px` }}
              >
                {promotionsData.map((promotion, index) => (
                  <div className="promotions__item slide" key={index}>
                    <div className="promotions__item-wrapper">
                      <div className="promotions__image">
                        <NavLink to={PROMOTIONS_ROUTE} title="">
                          <img
                            className="promotions__pict"
                            alt="promotion"
                            title=""
                            src={promotion.image}
                          />
                        </NavLink>
                      </div>

                      <div className="promotions__days">
                        <div>Осталось</div>
                        <span>{calculateDaysRemaining(promotion.endDate)}</span>
                        <div>дней</div>
                      </div>

                      <div className="promotions__txt">
                        <NavLink to={PROMOTIONS_ROUTE} title="">
                          {promotion.description}
                        </NavLink>
                        <div className="promotions__date">
                          по {promotion.endDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export { Promotions };
