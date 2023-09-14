interface NotificationProps {
  onClose: () => void;
  productName: string;
  productPrice: number;
  productImage: string;
}
const Notification: React.FC<NotificationProps> = ({
  onClose,
  productName,
  productPrice,
  productImage,
}) => {
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
                    <span> ₴</span>
                    <span>{productPrice}</span>
                  </bdi>
                </div>
              </div>
            </div>
            <hr className="notification__divider" />
            <div className="notification__total-info">
              <div className="notification__amount">В корзине 12 товаров</div>
              <div className="notification__subtotal">
                Предварительная стоимость корзины
                <bdi>
                  ₴<span>432,850</span>
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
              <a href="/cart" className="button">
                <span className="ty-icon ty-icon-ok"></span>
                <bdi>Оформить заказ</bdi>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
