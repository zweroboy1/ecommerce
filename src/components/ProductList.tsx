import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { ButtonIcon } from './ButtonIcon';
import { Context } from '../store/Context';
import Notification from './Notification';
import {
  addProductToCart,
  createCart,
  getMyCarts,
  removeProductFromCart,
} from '../services/commercetoolsApi';

const ProductList = observer(({ products }: { products: Product[] }) => {
  const { user } = useContext(Context);
  const isAuth = user?.isAuth;

  let userCart = user?.user?.cart;

  const [loadAddToCart, setLoadAddToCart] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    image: '',
  });

  const openModal = (productName: string, productPrice: number, productImage: string) => {
    setProductData({
      name: productName,
      price: productPrice,
      image: productImage,
    });

    setIsModalOpen(true);
  };

  async function addToCart(id: string, quantity: number) {
    setLoadAddToCart(id);
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
        id,
        userCart!.id,
        userCart!.version,
        quantity
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
    }
    setLoadAddToCart('');
  }

  async function removeFromCart(id: string) {
    setLoadAddToCart(id);

    if (!userCart?.lineItems.some((item) => item.id === id)) {
      // eslint-disable-next-line
      console.log('Этого продукта нет в корзине');
      return;
    }

    try {
      const result = await removeProductFromCart(
        user?.user?.token.access_token || '',
        id,
        userCart!.id,
        userCart!.version
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
    }
    setLoadAddToCart('');
  }

  return products.length === 0 ? (
    <p className="no-product">Нет продуктов, удовлетворяющих заданным условиям</p>
  ) : (
    <>
      <ToastContainer />
      <div className="goods">
        {products.map((product) => (
          <div key={product.id} className="goods__card">
            <div className="goods__wrapper">
              <div className="goods__image">
                <NavLink to={`/product/${product.slug}`}>
                  {product.images[1] ? (
                    <>
                      <img
                        className="goods__image_first"
                        src={product.images[0]}
                        alt={`${product.name} - image #1`}
                      />
                      <img
                        className="goods__image_second"
                        src={product.images[1]}
                        alt={`${product.name} - image #2`}
                      />
                    </>
                  ) : (
                    <img className="goods__image_only" src={product.images[0]} alt={product.name} />
                  )}
                </NavLink>
              </div>

              <div className="goods__info">
                <h2 className="goods__name">
                  <NavLink className="goods__title" to={`/product/${product.slug}`}>
                    {product.name}
                  </NavLink>
                </h2>
                <div className="goods__prices">
                  <div className="goods__price-block">
                    {product.discountedPrice ? (
                      <>
                        <span className="goods__old-price">
                          {formatPrice(product.price / 100)} ₴
                        </span>

                        <span className="goods__discounted-price">
                          {formatPrice(product.discountedPrice / 100)} ₴
                        </span>
                      </>
                    ) : (
                      <span className="goods__price">{formatPrice(product.price / 100)} ₴</span>
                    )}
                  </div>
                  <ButtonIcon
                    className={`goods__control ${loadAddToCart ? 'loading' : ''} ${
                      userCart?.lineItems.some((item) => item.productId === product.id)
                        ? 'added'
                        : ''
                    }`}
                    onClick={async () => {
                      openModal(product.name, product.price, product.images[0]);
                      const inCart = userCart?.lineItems.some(
                        (item) => item.productId === product.id
                      );
                      if (inCart) {
                        const productId =
                          userCart?.lineItems.find((item) => item.productId === product.id)?.id ||
                          '';
                        await removeFromCart(productId);
                      } else {
                        await addToCart(product.id, 1);
                      }
                    }}
                    type="button"
                    disabled={loadAddToCart === product.id}
                    title="Добавить в карзину"
                  >
                    {userCart?.lineItems.some((item) => item.productId === product.id) ? (
                      <i
                        className="goods__control-icon minicarticon__icon header-icon"
                        style={{ backgroundColor: 'red' }}
                      ></i>
                    ) : (
                      <i className="goods__control-icon minicarticon__icon header-icon"></i>
                    )}
                  </ButtonIcon>
                  {isModalOpen && (
                    <Notification
                      onClose={() => setIsModalOpen(false)}
                      productName={productData.name}
                      productPrice={productData.price / 100}
                      productImage={productData.image}
                    />
                  )}
                </div>
                <div className="goods__description1">{product.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export { ProductList };
