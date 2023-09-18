import { Cart } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface CartDropdownProps {
  closeCart: () => void;
  cartData: Cart | null;
}
const CartDropdown: React.FC<CartDropdownProps> = ({ closeCart, cartData }) => {
  const lineItems = cartData?.lineItems || [];

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
            {lineItems.map((item) => (
              <li key={item.id} className="cart-dropdown__item">
                <div className="cart-dropdown__image">
                  <img
                    alt={item.name.ru}
                    title={item.name.ru}
                    src={item.variant.images[0].url}
                    width="40"
                    height="40"
                  />
                </div>
                <div className="cart-dropdown__desc">
                  <span className="cart-dropdown__name">{item.name.ru}</span>
                  <p>
                    <span>{item.quantity}</span>
                    <span>&nbsp;x&nbsp;</span>
                    <bdi>
                      <span>
                        {formatPrice(
                          item.price.discounted
                            ? item.price.discounted.value.centAmount / 100
                            : item.price.value.centAmount / 100
                        )}
                      </span>
                      <span> ₴</span>
                    </bdi>
                  </p>
                </div>
                <div className="cart-dropdown__tools"></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons-container">
          <p className="buttons-container__subtotal">
            Всего (без промокодов):&nbsp;
            <span className="float-right">
              {lineItems.reduce((total, item) => total + item.quantity, 0)}&nbsp;шт. на&nbsp;&nbsp;
              <bdi>
                <span className="cart-price">
                  {formatPrice(
                    lineItems.reduce((total, item) => {
                      const price =
                        item.price.discounted?.value.centAmount || item.price.value.centAmount;
                      return total + (item.quantity * price) / 100;
                    }, 0)
                  )}
                  ₴
                </span>
              </bdi>
            </span>
            <br />
            &nbsp;
          </p>

          <a href="/cart" rel="nofollow" className="button button-cart">
            Перейти в Корзину
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
