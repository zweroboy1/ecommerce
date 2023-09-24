import { NavLink } from 'react-router-dom';
import { Cart } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { CART_ROUTE } from '../constants/route';

interface CartDropdownProps {
  closeCart: () => void;
  cartData: Cart | null;
}
const CartDropdown: React.FC<CartDropdownProps> = ({ closeCart, cartData }) => {
  const lineItems = cartData?.lineItems || [];
  const cartIsEmpty = lineItems.length === 0;

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__content">
        <div className="cart-dropdown__title">
          {cartIsEmpty ? 'Товаров нет!' : 'Товары в корзине:'}
          <div className="cart-dropdown__close" onClick={closeCart}>
            <i className="icon-close"></i>
          </div>
        </div>
        {cartIsEmpty ? (
          <div className="cart-dropdown__empty">Корзина пуста</div>
        ) : (
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
        )}
        {!cartIsEmpty && (
          <div className="buttons-container">
            <p className="buttons-container__subtotal">
              Всего
              <br />
              (без промокодов):&nbsp;
              <span className="float-right">
                {lineItems.reduce((total, item) => total + item.quantity, 0)}&nbsp;шт.
                на&nbsp;&nbsp;
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

            <NavLink to={CART_ROUTE} title="" className="button button-cart">
              Перейти в Корзину
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
