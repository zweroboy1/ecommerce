import { PropsWithoutRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { CartItemProps } from '../types';
import { ButtonIcon } from '../components/ButtonIcon';
import { formatPrice } from '../utils/formatPrice';

const CartItem = observer(
  ({ product, removeFromCart, addToCart }: PropsWithoutRef<CartItemProps>) => {
    const quantityInCart = product.quantity;
    const [quantity, setQuantity] = useState(quantityInCart);
    const amount = product.price.value.centAmount;
    const totalAmount = product.totalPrice.centAmount;
    let discountedPrice = product.price.discounted
      ? product.price.discounted.value.centAmount
      : false;
    if (product.discountedPrice) {
      discountedPrice = product.discountedPrice.value.centAmount;
    }
    const [loadChangeInCart, setLoadChangeInCart] = useState(false);

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoadChangeInCart(true);
      if (event.target.value === '' || event.target.value === '0') {
        if (quantityInCart === 1) {
          setLoadChangeInCart(false);
          return;
        }
        const prevQuantity = quantityInCart;
        await removeFromCart(product.id, prevQuantity - 1, () => {
          setQuantity(() => 1);
        });
        setLoadChangeInCart(false);
        return;
      }
      const value = parseInt(event.target.value, 10);

      if (
        Number.isNaN(value) ||
        !Number.isInteger(value) ||
        Number(event.target.value) > 999 ||
        loadChangeInCart
      ) {
        setLoadChangeInCart(false);
        return;
      }
      if (value === quantityInCart) {
        setLoadChangeInCart(false);
        return;
      }
      const prevQuantity = quantityInCart;
      if (value > prevQuantity) {
        await addToCart(product.productId, value - prevQuantity, () => {
          setQuantity(() => value);
        });
      } else {
        await removeFromCart(product.id, prevQuantity - value, () => {
          setQuantity(() => value);
        });
      }
      setLoadChangeInCart(false);
    };

    const handleDecrease = async () => {
      if (quantity <= 1) {
        return;
      }
      setLoadChangeInCart(true);

      await removeFromCart(product.id, 1, () => {
        setQuantity((prevQuantity) => (prevQuantity - 1 < 0 ? 0 : prevQuantity - 1));
      });
      setLoadChangeInCart(false);
    };

    const handleIncrease = async () => {
      if (quantity >= 999) {
        return;
      }
      setLoadChangeInCart(true);

      await addToCart(product.productId, 1, () => {
        setQuantity((prevQuantity) => (prevQuantity + 1 > 999 ? 999 : prevQuantity + 1));
      });
      setLoadChangeInCart(false);
    };

    return (
      <tr key={product.productId}>
        <td className="cart__image-block">
          <div className="cart__table-title-mob">Товар</div>
          <div className="cart__table-image">
            <NavLink to={`/product/${product.productSlug.ru}`}>
              <img
                alt={product.name.ru}
                title=""
                src={product.variant.images[0].url}
                width="150"
                height="150"
              />
            </NavLink>
          </div>
        </td>
        <td className="cart__content-description">
          <div className="cart__product-name">
            <NavLink to={`/product/${product.productSlug.ru}`} className="cart__product-title">
              {product.name.ru}
            </NavLink>
            <ButtonIcon
              className="cart__product-delete"
              title="Удалить"
              onClick={async () => {
                setLoadChangeInCart(true);
                await removeFromCart(product.id, quantity, () => {
                  toast.warn('Товар удален!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                  });
                });
                setLoadChangeInCart(false);
              }}
            >
              <span className="icon-cancel-circle" title="Удалить товар из корзины"></span>
            </ButtonIcon>
          </div>
          <div className="cart__product-sku">
            КОД:
            <span>{product.variant.sku}</span>
          </div>
        </td>

        <td className="cart__product-price">
          <div className="cart__table-title-mob">Цена за ед.</div>
          <bdi style={{ color: `${discountedPrice ? 'red' : 'black'}` }}>
            {discountedPrice ? (
              <span>{formatPrice(discountedPrice / 100)}</span>
            ) : (
              <span>{formatPrice(amount / 100)}</span>
            )}
            <span> ₴</span>
          </bdi>
          <br />
          <br />
          {discountedPrice && (
            <bdi style={{ textDecoration: 'line-through' }}>
              <span>{formatPrice(amount / 100)}</span>
              <span> ₴</span>
            </bdi>
          )}
        </td>

        <td className="cart__product-qty">
          <div className="cart__table-title-mob">Кол-во</div>
          <div className="quantity">
            <div className="quantity__changer">
              <button
                className="quantity__increase"
                onClick={handleIncrease}
                disabled={loadChangeInCart}
              >
                +
              </button>
              <input
                type="text"
                className="quantity__decimal"
                value={quantity}
                onChange={handleQuantityChange}
                data-ca-min-qty="1"
              />
              <button
                className="quantity__decrease"
                onClick={handleDecrease}
                disabled={loadChangeInCart}
              >
                -
              </button>
            </div>
          </div>
        </td>

        <td className="cart__product-price">
          <div className="cart__table-title-mob">Итого</div>
          <bdi>
            <span>{formatPrice(totalAmount / 100)}</span>
            <span> ₴</span>
          </bdi>
        </td>
      </tr>
    );
  }
);

export { CartItem };
