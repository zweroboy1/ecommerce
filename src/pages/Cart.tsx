import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { Context } from '../store/Context';
import { CartItem } from './CartItem';
import {
  addProductToCart,
  createCart,
  getMyCarts,
  removeProductFromCart,
} from '../services/commercetoolsApi';
import { formatPrice } from '../utils/formatPrice';

const Cart = observer(() => {
  const { user } = useContext(Context);
  let userCart = user?.user?.cart;
  const isAuth = user?.isAuth;
  const totalAmount = userCart ? userCart.totalPrice.centAmount : 0;

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
    }
  }

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main cart container">
        <div className="breadcrumbs">
          <a href="/" className="breadcrumbs__link">
            <bdi>Главная</bdi>
          </a>
          <span className="breadcrumbs__slash">/</span>
          <a href="/cart" className="breadcrumbs__link">
            <bdi>Корзина</bdi>
          </a>
        </div>
        <div className="cart__grid">
          <div className="cart__container">
            <div className="cart__body">
              <div className="cart__main">
                <div className="cart__form-wrapper">
                  <div className="cart__form">
                    <h1 className="cart__title-page">Корзина</h1>
                    <div className="cart__buttons-container">
                      <div className="cart__left-buttons">
                        <a href="/catalog" className="button button-second">
                          <bdi>Продолжить покупки</bdi>
                        </a>
                      </div>
                      {userCart && userCart.lineItems.length > 0 && (
                        <div className="cart__right-buttons">
                          <a href="/" className="button">
                            <span className="cart__icon-ok"></span>
                            <bdi>Оформить заказ</bdi>
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="cart__content">
                        {userCart && userCart.lineItems.length > 0 ? (
                          <div className="cart__items">
                            <table className="cart__table">
                              <thead>
                                <tr>
                                  <th className="cart__table-title">Товар</th>
                                  <th className="cart__table-title">&nbsp;</th>
                                  <th className="cart__table-title">Цена за ед.</th>
                                  <th className="cart__table-title">Кол-во</th>
                                  <th className="cart__table-titlet">Итого</th>
                                </tr>
                              </thead>

                              <tbody>
                                {userCart.lineItems.map((item) => (
                                  <CartItem
                                    key={item.productId}
                                    product={item}
                                    removeFromCart={removeFromCart}
                                    addToCart={addToCart}
                                  />
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="cart__empty">
                            <span>
                              Ваша корзина пока еще пуста...Мы рады предложить Вам ознакомиться с
                              нашим
                            </span>
                            <a href="/catalog" className="button button-second">
                              Каталогом товаров
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="cart__total">
                      <div className="cart__total-wrapper">
                        <div className="cart__coupons">
                          <div>
                            <form className="cart__processed-form" action="" method="post">
                              <div className="cart__hint">
                                <label className="cart__hint-label">Промо-код</label>
                                <input
                                  type="text"
                                  className="cart__hint-text"
                                  value=""
                                  onChange={() => {}}
                                />
                                <button title="Применить" className="cart__btn-go" type="submit">
                                  Применить
                                </button>
                              </div>
                            </form>
                          </div>

                          <ul className="cart__discount-info">
                            <li className="cart__discount-list">
                              <span className="caret-outer"></span>
                              <span className="caret-inner"></span>
                            </li>
                            <li className="cart__coupons-item">
                              <div className="cart__promotions">
                                <span className="cart__bonus">Ваши бонусы</span>
                                <ul>
                                  <li>
                                    <a className="cart__dashed-link">Скидка 5%</a>
                                    <div className="cart__wysiwyg-content">
                                      <p>
                                        При покупке комплекта Roborock Vacuum Cleaner S7 вы получите
                                        скидку 5%.
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <ul className="cart__statistic-list">
                          <li className="cart__statistic-item">
                            <span className="cart__statistic-title">Сумма</span>
                            <span className="cart__statistic-value">
                              <bdi>
                                <span>{formatPrice(totalAmount / 100)} ₴</span>
                              </bdi>
                            </span>
                          </li>
                          <li className="cart__statistic-item discount">
                            <span className="cart__statistic-title">Включая скидку</span>
                            <span className="cart__statistic-value">
                              <bdi>
                                <span>-100.00 ₴</span>
                              </bdi>
                            </span>
                          </li>
                        </ul>
                        <ul className="cart__statistic-total-list">
                          <li className="cart__statistic-total-item">
                            <span className="cart__statistic-total-title">Итоговая стоимость</span>
                            <span className="cart__statistic-total-value">
                              <bdi>
                                <span>{formatPrice(totalAmount / 100)}</span>
                                <span> ₴</span>
                              </bdi>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="cart__buttons-container">
                      <div className="cart__left-buttons">
                        <a href="/catalog" className="button button-second">
                          <bdi>Продолжить покупки</bdi>
                        </a>
                        {userCart && userCart.lineItems.length > 0 && (
                          <a className="button" href="/">
                            <bdi>Очистить корзину</bdi>
                          </a>
                        )}
                      </div>
                      {userCart && userCart.lineItems.length > 0 && (
                        <div className="cart__right-buttons">
                          <a href="/" className="button">
                            <span className="icon-ok"></span>
                            <bdi>Оформить заказ</bdi>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
});

export { Cart };
