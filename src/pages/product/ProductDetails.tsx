import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { ProductDetailsProps } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { COLORS } from '../../constants';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Context } from '../../store/Context';
import {
  addProductToCart,
  createCart,
  getMyCarts,
  removeProductFromCart,
} from '../../services/commercetoolsApi';

const ProductDetails: React.FC<ProductDetailsProps> = observer(
  ({ id, price, discountedPrice, brand, color, sku }) => {
    const { user } = useContext(Context);
    const isAuth = user?.isAuth;
    let userCart = user?.user?.cart;
    const inCart = userCart?.lineItems.some((item) => item.productId === id);
    const quantityInCart = inCart
      ? userCart?.lineItems.find((item) => item.productId === id)?.quantity || 0
      : 0;
    const [quantity, setQuantity] = useState(inCart ? quantityInCart : 1);
    const [loadAddToCart, setLoadAddToCart] = useState(false);

    async function addToCart(productId: string, productQuantity: number) {
      if (!userCart) {
        try {
          const userCarts = await getMyCarts(user?.user?.token.access_token || '');
          if (userCarts.count) {
            const cart = userCarts.results[0];
            userCart = cart;
          } else {
            throw new Error('CT_NO_CART_ERROR');
          }
        } catch (error) {
          const cart = await createCart(user?.user?.token.access_token || '');
          userCart = cart;
        }
      }

      try {
        const result = await addProductToCart(
          user?.user?.token.access_token || '',
          productId,
          userCart!.id,
          userCart!.version,
          productQuantity
        );
        const userData = isAuth ? user!.user!.user : null;
        const userToken = user!.user!.token;
        user!.setUser({
          user: userData,
          cart: result,
          token: userToken,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setLoadAddToCart(false);
      }
    }
    async function removeFromCart(productId: string, productQuantity: number) {
      if (!userCart?.lineItems.some((item) => item.id === productId)) {
        // eslint-disable-next-line
        console.log('Этого продукта нет в корзине');
        return;
      }

      try {
        const result = await removeProductFromCart(
          user?.user?.token.access_token || '',
          productId,
          userCart!.id,
          userCart!.version,
          productQuantity
          /* , последний параметр - количество. если не указан, то удалятся все экземпляры этого продукта, если цифра, например 1, то будет удалять столько единиц */
        );
        const userData = isAuth ? user!.user!.user : null;
        const userToken = user!.user!.token;
        user!.setUser({
          user: userData,
          cart: result,
          token: userToken,
        });
      } catch (error) {
        toast.error('Что-то пошло не так! Попробуйте чуть позже!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setLoadAddToCart(false);
      }
    }

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoadAddToCart(true);
      if (event.target.value === '' || event.target.value === '0') {
        if (!inCart) {
          setQuantity(() => 0);
          setLoadAddToCart(false);
          return;
        }
        const prevQuantity = quantityInCart;
        setQuantity(() => 0);
        const productId = userCart?.lineItems.find((item) => item.productId === id)?.id || '';
        await removeFromCart(productId, prevQuantity);
        setLoadAddToCart(false);
        return;
      }
      const value = parseInt(event.target.value, 10);
      if (
        Number(value) < 0 ||
        Number.isNaN(value) ||
        !Number.isInteger(value) ||
        value > 999 ||
        loadAddToCart
      ) {
        setLoadAddToCart(false);
        return;
      }
      const prevQuantity = inCart ? quantityInCart : 0;
      setQuantity(() => Number(value));
      if (inCart) {
        if (Number(value) > prevQuantity) {
          await addToCart(id, Number(value) - prevQuantity);
        } else {
          const productId = userCart?.lineItems.find((item) => item.productId === id)?.id || '';
          await removeFromCart(productId, prevQuantity - Number(value));
        }
      }
      // else if (Number(event.target.value) > 0) {
      //   await addToCart(id, Number(event.target.value));
      // }
      setLoadAddToCart(false);
    };

    const handleDecrease = async () => {
      if (quantity <= 1) {
        return;
      }
      setLoadAddToCart(true);

      setQuantity((prevQuantity) => (prevQuantity - 1 < 0 ? 0 : prevQuantity - 1));
      if (inCart) {
        const productId = userCart?.lineItems.find((item) => item.productId === id)?.id || '';
        await removeFromCart(productId, 1);
      }
      setLoadAddToCart(false);
    };

    const handleIncrease = async () => {
      if (quantity >= 999) {
        return;
      }
      setLoadAddToCart(true);

      setQuantity((prevQuantity) => (prevQuantity + 1 > 999 ? 999 : prevQuantity + 1));
      if (inCart) {
        await addToCart(id, 1);
      }
      setLoadAddToCart(false);
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
                  <button
                    className="product__decrease"
                    onClick={handleDecrease}
                    disabled={loadAddToCart}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="product__amount"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    className="product__decrease"
                    onClick={handleIncrease}
                    disabled={loadAddToCart}
                  >
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
              <ButtonIcon
                className={`product__cart-button button ${inCart ? 'inCard' : ''} ${
                  loadAddToCart ? 'loading' : ''
                }`}
                title="Добавлено"
                type="button"
                onClick={async () => {
                  if (inCart) {
                    const productId =
                      userCart?.lineItems.find((item) => item.productId === id)?.id || '';
                    await removeFromCart(productId, quantity);
                  } else {
                    await addToCart(id, quantity);
                  }
                }}
                disabled={loadAddToCart || quantity === 0}
              >
                <span>
                  <i className="product__icon-cart"></i>
                  {!loadAddToCart && (inCart ? <bdi>Удалить все</bdi> : <bdi>В корзину</bdi>)}
                  {loadAddToCart && <bdi>loading</bdi>}
                </span>
              </ButtonIcon>
              {inCart && <bdi>Добавлено ({quantityInCart})</bdi>}
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
  }
);

export { ProductDetails };
