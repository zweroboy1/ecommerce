import { NavLink } from 'react-router-dom';
import banner1 from '../../../assets/img/banner1.png';
import banner2 from '../../../assets/img/banner2.png';
import banner3 from '../../../assets/img/banner3.png';
import banner4 from '../../../assets/img/banner4.png';
import banner5 from '../../../assets/img/banner5.png';
import banner6 from '../../../assets/img/banner6.png';

const bannersData = [
  { img: banner1, title: 'Ноутбуки', link: '/catalog/notebooks' },
  { img: banner2, title: 'Телефоны', link: '/catalog/phones' },
  { img: banner3, title: 'Пылесосы', link: '/catalog/home-appliances/vacuum-cleaners' },
  { img: banner4, title: 'Аудио и видео техника', link: '/catalog/audio-video' },
  { img: banner5, title: 'Бытовая техника', link: '/catalog/home-appliances' },
  { img: banner6, title: 'Телевизоры', link: '/catalog/audio-video/televisions' },
];

const BestCategories = () => {
  return (
    <div className="best-categories container">
      <div className="best-categories__grid">
        {bannersData.map((banner, index) => (
          <div className="best-categories__block" key={index}>
            <div className="banner best-categories__item">
              <NavLink to={banner.link} title="">
                <div className="banner__bg best-categories__bg">
                  <div className="banner__content best-categories__content">
                    <div className="banner__img best-categories__img">
                      <img className="best-categories__pict" alt="" title="" src={banner.img} />
                    </div>
                    <div className="banner__description width-full">
                      <div className="banner__box best-categories__box">
                        <div className="banner__title best-categories__title">{banner.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { BestCategories };
