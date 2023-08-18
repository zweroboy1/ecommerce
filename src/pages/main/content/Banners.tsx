import { NavLink } from 'react-router-dom';
import { ELECTRONICS_ROUTE } from '../../../constants/route';
import dji from '../../../assets/img/dji_mini3.png';
import video from '../../../assets/video/video.mp4';

const Banners = () => {
  return (
    <div className="banner">
      <NavLink to={ELECTRONICS_ROUTE} title="">
        <div className="banner__bg">
          <div>
            <video className="banner__video" src={video} autoPlay loop></video>
            <div className="banner__content">
              <div className="banner__img">
                <img alt="banner" title="" src={dji} />
              </div>
              <div className="banner__description">
                <div className="banner__box">
                  <div className="banner__title">
                    <span className="banner__subtitle">
                      DJI MINI 3<span className="banner__span"> PRO</span>
                    </span>
                  </div>
                  <div className="banner__txt">
                    Прямое управление телефоном с передачей <br />
                    или управление передатчиком с помощью смартфона.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export { Banners };
