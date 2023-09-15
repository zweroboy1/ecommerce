import { PropsWithoutRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CartItemProps } from '../types';

const CartItem = observer(({ product, removeFromCart }: PropsWithoutRef<CartItemProps>) => {
  const quantityInCart = product.quantity;
  const [quantity, setQuantity] = useState(quantityInCart);
  const amount = product.price.value.fractionDigits
    ? `${product.price.value.centAmount
        .toString()
        .split('')
        .slice(0, -product.price.value.fractionDigits)
        .join('')}.${'0'.repeat(product.price.value.fractionDigits)}`
    : product.price.value.centAmount;
  const totalAmount = product.totalPrice.fractionDigits
    ? `${product.totalPrice.centAmount
        .toString()
        .split('')
        .slice(0, -product.totalPrice.fractionDigits)
        .join('')}.${'0'.repeat(product.totalPrice.fractionDigits)}`
    : product.totalPrice.centAmount;
  // const handleQuantityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (
  //     Number(event.target.value) < 0 ||
  //     Number.isNaN(Number(event.target.value)) ||
  //     !Number.isInteger(Number(event.target.value)) ||
  //     Number(event.target.value) > 999 ||
  //     loadAddToCart
  //   ) {
  //     return;
  //   }
  //   const prevQuantity = inCart ? quantityInCart : 0;
  //   setQuantity(() => Number(event.target.value));
  //   if (inCart) {
  //     if (Number(event.target.value) > prevQuantity) {
  //       await addToCart(id, Number(event.target.value) - prevQuantity);
  //     } else {
  //       const productId = userCart?.lineItems.find((item) => item.productId === id)?.id || '';
  //       await removeFromCart(productId, prevQuantity - Number(event.target.value));
  //     }
  //   }
  //   // else if (Number(event.target.value) > 0) {
  //   //   await addToCart(id, Number(event.target.value));
  //   // }
  // };
  const handleQuantityChange = () => {};

  const handleDecrease = async () => {
    if (quantity <= 1) {
      return;
    }

    setQuantity((prevQuantity) => (prevQuantity - 1 < 0 ? 0 : prevQuantity - 1));
    await removeFromCart(product.id, 1);
  };

  // const handleIncrease = () => {
  //   setQuantity((prevQuantity) => (prevQuantity + 1 > 999 ? 999 : prevQuantity + 1));
  //   if (inCart) {
  //     addToCart(id, 1);
  //   }
  // };

  return (
    <tr key={product.productId}>
      <td className="cart__image-block">
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
        <a href={`/product/${product.productSlug.ru}`} className="cart__product-title">
          {product.name.ru}
        </a>
        <a className="cart__product-delete" title="Удалить">
          <span className="icon-cancel-circle"></span>
        </a>
        <div className="cart__product-sku">
          КОД:
          <span>{product.variant.sku}</span>
        </div>
      </td>

      <td className="cart__product-price">
        <bdi>
          <span>{amount}</span>
          <span> ₴</span>
          {/* <span>{item.price.value.currencyCode}</span> */}
        </bdi>
      </td>

      <td className="cart__product-qty">
        <div className="quantity">
          <div className="quantity__changer">
            <button className="quantity__increase" onClick={handleDecrease} disabled={false}>
              −
            </button>
            <input
              type="text"
              className="quantity__decimal"
              value={quantity}
              onChange={handleQuantityChange}
              data-ca-min-qty="1"
            />
            <button className="quantity__decrease" onClick={() => {}} disabled={false}>
              +
            </button>
          </div>
        </div>
      </td>

      <td className="cart__product-price">
        <bdi>
          <span>{totalAmount}</span>
          <span> ₴</span>
        </bdi>
      </td>
    </tr>
  );
});

export { CartItem };
