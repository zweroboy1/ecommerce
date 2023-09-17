import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../store/Context';
import { formatPrice } from '../utils/formatPrice';
import { CART_ROUTE } from '../constants/route';

interface NotificationProps {
  onClose: () => void;
  productName: string;
  productPrice: number;
  discontPrice: number;
  productImage: string;
}

const Notification: React.FC<NotificationProps> = ({
  onClose,
  productName,
  productPrice,
  discontPrice,
  productImage,
}) => {
  const { user } = useContext(Context);
  const userCart = user?.user?.cart;
  const cartQuantity = user?.user?.cart?.lineItems.length
    ? user?.user?.cart?.lineItems.reduce((prev, cur) => prev + cur.quantity, 0)
    : 0;
  const totalAmount = userCart ? userCart.totalPrice.centAmount : 0;

  const price = discontPrice || productPrice;

  return (
    <div className="notification">
      <div className="notification__overlay"></div>
      <div className="notification__content">
        <h1>
          Товар добавлен в корзину
          <span className="notification__close" onClick={onClose}>
            ×
          </span>
        </h1>
        <div className="notification__body">
          <div className="notification__product">
            <div className="notification__product-item">
              <img
                className="notification__product-image"
                alt=""
                title=""
                width="80"
                height="80"
                src={productImage}
              />
              <div className="notification__product-content">
                <a href="/" className="notification__product-name">
                  {productName}
                </a>
                <div className="notification__product-price">
                  <span className="none">1</span>
                  <span dir="ltr">&nbsp;x&nbsp;</span>
                  <bdi>
                    <span>{formatPrice(price)} ₴</span>
                  </bdi>
                </div>
              </div>
            </div>
            <hr className="notification__divider" />
            <div className="notification__total-info">
              <div className="notification__amount">В корзине {cartQuantity} товаров</div>
              <div className="notification__subtotal">
                Предварительная стоимость корзины
                <bdi>
                  <span>{formatPrice(totalAmount / 100)} ₴</span>
                </bdi>
              </div>
            </div>
          </div>
          <div className="notification__buttons">
            <div className="notification__btn-left">
              <a className="button-second button" onClick={onClose}>
                <bdi>Продолжить покупки</bdi>
              </a>
            </div>
            <div className="notification__btn-right">
              <NavLink to={CART_ROUTE} title="" className="button">
                <span className="ty-icon ty-icon-ok"></span>
                <bdi>В корзину</bdi>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
