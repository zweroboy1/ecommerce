import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { ELECTRONICS_ROUTE, PHOTO_VIDEO_ROUTE } from '../../../constants/route';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dji from '../../../assets/img/dji_mini3.png';
import woman from '../../../assets/img/woman.png';
import fly from '../../../assets/video/fly.mp4';
import fire from '../../../assets/video/fire2.mp4';

const Banners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
  };

  const banners = [
    {
      image: dji,
      video: fly,
      title: 'DJI MINI 3 ',
      subtitle: 'PRO',
      description1: 'Прямое управление телефоном с передачей',
      description2: 'или управление передатчиком с помощью смартфона.',
      link: ELECTRONICS_ROUTE,
    },
    {
      image: woman,
      video: fire,
      class: 'row-reverse',
      title: 'БУДЬТЕ ВЕЗДЕ, ',
      subtitle: 'СМОТРИТЕ ВСЕ',
      description1: 'Все, что вы можете сделать в реальной жизни,',
      description2: 'вы можете сделать лучше и безопаснее в виртуальном мире.',
      link: PHOTO_VIDEO_ROUTE,
    },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="banner">
            <NavLink to={banner.link} title="">
              <div className="banner__bg">
                <div>
                  <video
                    className="banner__video"
                    src={banner.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                  <div className={`banner__content ${banner.class ? banner.class : ''}`}>
                    <div className="banner__img">
                      <img alt="banner" title="" src={banner.image} />
                    </div>
                    <div className="banner__description">
                      <div className="banner__box">
                        <div className="banner__title">
                          <span className="banner__subtitle">
                            {banner.title}
                            <span className="banner__span">{banner.subtitle}</span>
                          </span>
                        </div>
                        <div className="banner__txt">
                          <span>{banner.description1}</span>
                          <br />
                          <span>{banner.description2}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export { Banners };
