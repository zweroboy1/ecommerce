import { PropsWithoutRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CartItemProps } from '../types';
import { ButtonIcon } from '../components/ButtonIcon';
import { formatPrice } from '../utils/formatPrice';

const CartItem = observer(
  ({ product, removeFromCart, addToCart }: PropsWithoutRef<CartItemProps>) => {
    const quantityInCart = product.quantity;
    const [quantity, setQuantity] = useState(quantityInCart);
    const amount = product.price.value.centAmount;
    const totalAmount = product.totalPrice.centAmount;
    const discountedPrice = product.price.discounted
      ? product.price.discounted.value.centAmount
      : false;
    const [loadChangeInCart, setLoadChangeInCart] = useState(false);

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoadChangeInCart(true);
      if (event.target.value === '' || event.target.value === '0') {
        if (quantityInCart === 1) {
          setLoadChangeInCart(false);
          return;
        }
        const prevQuantity = quantityInCart;
        setQuantity(() => 1);
        await removeFromCart(product.id, prevQuantity - 1);
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
      setQuantity(() => value);
      if (value > prevQuantity) {
        await addToCart(product.productId, value - prevQuantity);
      } else {
        await removeFromCart(product.id, prevQuantity - value);
      }
      setLoadChangeInCart(false);
    };

    const handleDecrease = async () => {
      if (quantity <= 1) {
        return;
      }
      setLoadChangeInCart(true);

      setQuantity((prevQuantity) => (prevQuantity - 1 < 0 ? 0 : prevQuantity - 1));
      await removeFromCart(product.id, 1);
      setLoadChangeInCart(false);
    };

    const handleIncrease = async () => {
      setLoadChangeInCart(true);
      setQuantity((prevQuantity) => (prevQuantity + 1 > 999 ? 999 : prevQuantity + 1));
      await addToCart(product.productId, 1);
      setLoadChangeInCart(false);
    };

    return (
      <tr key={product.productId}>
        <td className="cart__image-block">
          <div className="cart__table-title-mob">Товар</div>
          <div className="cart__table-image">
            <a href={`/product/${product.productSlug.ru}`}>
              <img
                alt={product.name.ru}
                title=""
                src={product.variant.images[0].url}
                width="150"
                height="150"
              />
            </a>
          </div>
        </td>
        <td className="cart__content-description">
          <div className="cart__product-name">
            <a href={`/product/${product.productSlug.ru}`} className="cart__product-title">
              {product.name.ru}
            </a>
            <ButtonIcon
              className="cart__product-delete"
              title="Удалить"
              onClick={async () => {
                setLoadChangeInCart(true);
                await removeFromCart(product.id, quantity);
                setLoadChangeInCart(false);
              }}
            >
              <span className="icon-cancel-circle"></span>
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
