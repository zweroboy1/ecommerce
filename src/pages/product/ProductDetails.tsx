import { useState } from 'react';
import { ProductDetailsProps } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { COLORS } from '../../constants';

const ProductDetails: React.FC<ProductDetailsProps> = ({
  price,
  discountedPrice,
  brand,
  color,
  sku,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // логика добавления товара в корзину
  };

  const savings = discountedPrice ? (price - discountedPrice) / 100 : 0;
  return (
    <div className="product__form">
      <div className="product__sku">
        <label className="product__sku-label">КОД:</label>
        <span className="product__sku-item">{sku}</span>
      </div>

      <div className="product__brand">
        <label className="product__brand-label">Бренд:</label>
        <span className="product__brand-item">{brand}</span>
      </div>

      <div className="product__feature">
        <label className="product__feature-label">Цвет:</label>
        <span className="product__feature-item">{COLORS[color]}</span>
      </div>

      <div className="product__price">
        <div className="product__price-actual">
          <span className="product__price-content">
            <bdi>
              {discountedPrice ? (
                <span className="product__discount">{formatPrice(discountedPrice / 100)}</span>
              ) : (
                <span className="product__original-price">{formatPrice(price / 100)}</span>
              )}
              <span className="product__num">₴</span>
            </bdi>
          </span>
        </div>
        {discountedPrice && (
          <div className="product__price-old">
            <span className="product__price-content">
              <bdi>
                <span className="product__original-price">{formatPrice(price / 100)}</span>
                <span className="product__num">₴</span>
              </bdi>
            </span>
          </div>
        )}
      </div>

      {discountedPrice && (
        <div className="product__profit">
          <span className="product__profit-content">
            Экономия:
            <bdi>
              <span className="product__discount">{formatPrice(savings)}</span>
              <span className="product__num">₴</span>
            </bdi>
          </span>
        </div>
      )}

      <div className="product__qnt-cart">
        <div className="product__quantity">
          <div className="product__quantity-content">
            <input type="hidden" name="appearance[show_qty]" value="1" />
            <input type="hidden" name="appearance[capture_options_vs_qty]" value="" />
            <div className="product__changer">
              <div className="product__changer1">
                <button className="product__decrease" onClick={handleDecrease}>
                  −
                </button>
                <input
                  type="text"
                  className="product__amount"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button className="product__decrease" onClick={handleIncrease}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="product__cart">
          <input type="hidden" name="appearance[show_add_to_cart]" value="1" />
          <input type="hidden" name="appearance[show_list_buttons]" value="1" />
          <input type="hidden" name="appearance[but_role]" value="big" />
          <input type="hidden" name="appearance[quick_view]" value="" />
          <div>
            <button className="product__cart-button button" type="submit" onClick={handleAddToCart}>
              <span>
                <i className="product__icon-cart"></i>
                <bdi>В корзину</bdi>
              </span>
            </button>
          </div>
        </div>

        <div className="product__buttons">
          <div className="compared-products">
            <div className="compared-products__title">
              <a title="" rel="nofollow" className="" href="/compare">
                <i className="compared-products__icon header-icon"></i>
              </a>
            </div>
          </div>
          <div className="wishlist">
            <div className="wishlist__title">
              <a rel="nofollow" className="" href="/saved">
                <i className="wishlist__icon header-icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
