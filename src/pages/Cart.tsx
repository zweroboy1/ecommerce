import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { Context } from '../store/Context';
import { CartItem } from './CartItem';
import {
  CT_BAD_PROMOCODE,
  CT_NETWORK_PROBLEM,
  CT_FAILED_TO_FETCH,
  CT_UNKNOWN_ERROR,
} from '../constants/apiMessages';
import {
  addProductToCart,
  createCart,
  getMyCarts,
  removeProductFromCart,
  removeProductsFromCart,
  addDiscountCode,
} from '../services/commercetoolsApi';
import { formatPrice } from '../utils/formatPrice';
import { CATALOG_ROUTE, MAIN_ROUTE } from '../constants/route';
import { PROMOCODES } from '../constants/promocodes';
import { Cart as CartType, LineItem } from '../types';
import { BreadcrumbsPage } from '../components/BreadcrumbsPage';
import NotificationCart from '../components/NotificationCart';

const Cart = observer(() => {
  const [promoCode, setPromoCode] = useState<string>('');
  const { user } = useContext(Context);
  let userCart = user?.user?.cart;
  const isAuth = user?.isAuth;
  const totalAmount = userCart ? userCart.totalPrice.centAmount : 0;

  const getActualPromocodes = (
    cart: CartType | null | undefined
  ): { code: string; description: string }[] => {
    const promocodes: { code: string; description: string }[] = [];
    if (cart && cart.discountCodes) {
      cart.discountCodes.forEach((codeObj) => {
        const currentPromocode = PROMOCODES.filter(
          (promocode) => promocode.id === codeObj.discountCode.id
        );
        if (currentPromocode) {
          const { code } = currentPromocode[0];
          const { description } = currentPromocode[0];
          promocodes.push({ code, description });
        }
      });
    }
    return promocodes;
  };
  const actualPromocodes: { code: string; description: string }[] = getActualPromocodes(userCart);
  const countTotal = (items: LineItem[] | undefined) =>
    items === undefined
      ? 0
      : items.reduce(
          (acc, product) => acc + Number(product.price.value.centAmount) * Number(product.quantity),
          0
        );
  const totalSum = countTotal(userCart?.lineItems);

  async function addToCart(productId: string, productQuantity: number, cb?: () => void) {
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
      if (result instanceof Error) {
        throw new Error(result.message);
      }
      const userData = isAuth ? user!.user!.user : null;
      const userToken = user!.user!.token;
      user!.setUser({
        user: userData,
        cart: result,
        token: userToken,
      });
      if (cb) {
        cb();
      }
    } catch (error) {
      toast.error(CT_UNKNOWN_ERROR, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }

  async function removeFromCart(productId: string, productQuantity: number, cb?: () => void) {
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
      );
      const userData = isAuth ? user!.user!.user : null;
      const userToken = user!.user!.token;
      user!.setUser({
        user: userData,
        cart: result,
        token: userToken,
      });
      if (cb) {
        cb();
      }
    } catch (error) {
      toast.error(CT_UNKNOWN_ERROR, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }

  async function clearCart() {
    if (!userCart?.lineItems || userCart?.lineItems.length === 0) {
      // eslint-disable-next-line
      console.log('Корзина пуста');
      return;
    }

    const productsIds = userCart.lineItems.map((item) => item.id);
    try {
      const result = await removeProductsFromCart(
        user?.user?.token.access_token || '',
        productsIds,
        userCart!.id,
        userCart!.version
      );
      if (result instanceof Error) {
        throw new Error(result.message);
      }
      const userData = isAuth ? user!.user!.user : null;
      const userToken = user!.user!.token;
      user!.setUser({
        user: userData,
        cart: result,
        token: userToken,
      });
    } catch (error) {
      toast.error(CT_UNKNOWN_ERROR, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }

  async function applyCode() {
    if (!promoCode) {
      return;
    }

    try {
      const newCart = await addDiscountCode(
        promoCode,
        user?.user?.token.access_token || '',
        userCart!.id,
        userCart!.version
      );
      const userData = isAuth ? user!.user!.user : null;
      const userToken = user!.user!.token;
      user!.setUser({
        user: userData,
        cart: newCart,
        token: userToken,
      });
    } catch (error) {
      let toastText = CT_UNKNOWN_ERROR;
      if (error instanceof Error) {
        if (error?.message === CT_FAILED_TO_FETCH) {
          toastText = CT_NETWORK_PROBLEM;
        }
        if (error?.message === CT_BAD_PROMOCODE) {
          toastText = CT_BAD_PROMOCODE;
        }
      }
      toast.error(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyCode();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const breadcrumbs = [{ to: '.', text: 'Корзина' }];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="tygh">
      <Top />
      <Header />
      <ToastContainer />
      <main className="main cart container">
        <ToastContainer />
        <BreadcrumbsPage links={breadcrumbs} />
        <div className="cart__grid">
          <div className="cart__container">
            <div className="cart__body">
              <div className="cart__main">
                <div className="cart__form-wrapper">
                  <div className="cart__form">
                    <h1 className="cart__title-page">Корзина</h1>
                    {userCart && userCart.lineItems.length > 0 && (
                      <div className="cart__buttons-container">
                        <div className="cart__left-buttons">
                          <NavLink to={CATALOG_ROUTE} className="button button-second">
                            <bdi>Продолжить покупки</bdi>
                          </NavLink>
                        </div>
                        <div className="cart__right-buttons">
                          <a role="button" tabIndex={0} className="button" onClick={openModal}>
                            <span className="cart__icon-ok"></span>
                            <bdi>Оформить заказ</bdi>
                          </a>
                        </div>
                      </div>
                    )}

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
                                  <th className="cart__table-title">Итого</th>
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
                            <span>Ваша корзина пока еще пуста...</span>
                            <span>Мы рады предложить Вам ознакомиться с нашим</span>
                            <NavLink to={CATALOG_ROUTE} className="button">
                              Каталогом товаров
                            </NavLink>
                          </div>
                        )}
                      </div>
                    </div>

                    {userCart?.lineItems && userCart.lineItems.length > 0 && (
                      <div className="cart__total">
                        <div className="cart__total-wrapper">
                          <div className="cart__coupons">
                            <div>
                              <div className="cart__processed-form">
                                <div className="cart__hint">
                                  <label className="cart__hint-label">Промо-код</label>
                                  <input
                                    type="text"
                                    className="cart__hint-text"
                                    value={promoCode}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                  />
                                  <button
                                    title="Применить"
                                    className="cart__btn-go"
                                    type="button"
                                    onClick={applyCode}
                                  >
                                    Применить
                                  </button>
                                </div>
                              </div>
                            </div>

                            <ul className="cart__discount-info">
                              <li className="cart__discount-list">
                                <span className="caret-outer"></span>
                                <span className="caret-inner"></span>
                              </li>
                              <li className="cart__coupons-item">
                                <div className="cart__promotions">
                                  <div className="cart__bonus">
                                    {actualPromocodes.length
                                      ? 'Примененные промокоды'
                                      : 'Введите промокод'}{' '}
                                  </div>
                                  <ul>
                                    {actualPromocodes.length === 0 && (
                                      <li>
                                        <div>
                                          Актуальные промокоды можно найти на
                                          <NavLink to={MAIN_ROUTE} className={'cart__link'}>
                                            главной странице
                                          </NavLink>
                                          нашего магазина
                                        </div>
                                      </li>
                                    )}
                                    {actualPromocodes.map((promocode) => (
                                      <li key={promocode.code}>
                                        <a className="cart__dashed-link">{promocode.code}</a>
                                        <div>{promocode.description}</div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <ul className="cart__statistic-list">
                            <li className="cart__statistic-item">
                              <span className="cart__statistic-title">
                                Сумма без промокодов и акций
                              </span>
                              <span className="cart__statistic-value">
                                <bdi>
                                  <span>{formatPrice(totalSum / 100)} ₴</span>
                                </bdi>
                              </span>
                            </li>
                            <li className="cart__statistic-item discount">
                              <span className="cart__statistic-title">Итоговая скидка</span>
                              <span className="cart__statistic-value">
                                <bdi>
                                  <span>{formatPrice((totalSum - totalAmount) / 100)} ₴</span>
                                </bdi>
                              </span>
                            </li>
                          </ul>
                          <ul className="cart__statistic-total-list">
                            <li className="cart__statistic-total-item">
                              <span className="cart__statistic-total-title">
                                Итоговая стоимость
                              </span>
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
                    )}

                    {userCart && userCart.lineItems.length > 0 && (
                      <div className="cart__buttons-container">
                        <div className="cart__left-buttons">
                          <NavLink to={CATALOG_ROUTE} className="button button-second">
                            <bdi>Продолжить покупки</bdi>
                          </NavLink>
                          <a
                            className="button"
                            href="/"
                            onClick={async (e: React.MouseEvent<HTMLAnchorElement>) => {
                              e.preventDefault();
                              await clearCart();
                            }}
                          >
                            <bdi>Очистить корзину</bdi>
                          </a>
                        </div>
                        <div className="cart__right-buttons">
                          <a role="button" tabIndex={0} className="button" onClick={openModal}>
                            <span className="icon-ok"></span>
                            <bdi>Оформить заказ</bdi>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && <NotificationCart onClose={closeModal} />}
      </main>
      <Footer />
    </div>
  );
});

export { Cart };
