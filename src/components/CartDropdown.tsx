interface CartDropdownProps {
  closeCart: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ closeCart }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__content">
        <div className="cart-dropdown__title">
          Товары в корзине:
          <div className="cart-dropdown__close" onClick={closeCart}>
            <i className="icon-close"></i>
          </div>
        </div>
        <div className="cart-dropdown__product">
          <ul className="cart-dropdown__list">
            <li className="cart-dropdown__item">
              <div className="cart-dropdown__image">
                <a href="/product/roborock-vacuum-cleaner-s7-white">
                  <img
                    alt="product"
                    title="product"
                    src="https://973f0ebc2f4cec1318e0-33f939a34f35a5788da19fefac41f961.ssl.cf3.rackcdn.com/robot-pylesos-roboro-pgOecVSB.jpeg"
                    width="40"
                    height="40"
                  />
                </a>
              </div>
              <div className="cart-dropdown__desc">
                <a href="/">Робот-пылесос Roborock Vacuum Cleaner S7 (White)</a>
                <p>
                  <span>1</span>
                  <span>&nbsp;x&nbsp;</span>
                  <bdi>
                    <span>19 999.00</span>
                    <span> ₴</span>
                  </bdi>
                </p>
              </div>
              <div className="cart-dropdown__tools"></div>
            </li>
          </ul>
        </div>

        <div className="buttons-container">
          <p className="buttons-container__subtotal">
            Всего:&nbsp;
            <span className="float-right">
              1&nbsp;шт. на&nbsp;&nbsp;
              <bdi>
                <span className="cart-price">19 999.00 ₴</span>
              </bdi>
            </span>
            <br />
            &nbsp;
          </p>

          <a href="/cart" rel="nofollow" className="button button-cart">
            Корзина
          </a>

          {/* <a href="/" className="button">
            <span className="icon-ok"></span>
            <bdi>Оформить заказ</bdi>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
