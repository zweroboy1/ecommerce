import { NavLink } from 'react-router-dom';
import { CATALOG_ROUTE } from '../constants/route';

const NotificationCart = ({ onClose }: { onClose: () => void }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="notification">
      <div className="notification__overlay"></div>
      <div className="notification__content">
        <h1>
          Ваш заказ успешно создан!
          <span className="notification__close" onClick={handleClose}>
            ×
          </span>
        </h1>
        <div className="notification__body">
          <div className="notification__product">
            <div className="notification__total-info">
              <div className="notification__cart">Спасибо, что выбрали нас.</div>
            </div>
          </div>
          <div className="notification__buttons">
            <div className="notification__btn-left">
              <a className="button-second button" onClick={handleClose}>
                <bdi>Продолжить покупки</bdi>
              </a>
            </div>
            <div className="notification__btn-right">
              <NavLink to={CATALOG_ROUTE} title="" className="button">
                <span className="ty-icon ty-icon-ok"></span>
                <bdi>В каталог</bdi>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCart;
