import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const Cart = () => {
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
                  <form name="checkout-form" className="cart__form" action="" method="post">
                    <h1 className="cart__title-page">Корзина</h1>
                    <div className="cart__buttons-container">
                      <div className="cart__left-buttons">
                        <a href="/" className="button button-second">
                          <bdi>Продолжить покупки</bdi>
                        </a>
                      </div>
                      <div className="cart__right-buttons">
                        <a href="/" className="button">
                          <span className="cart__icon-ok"></span>
                          <bdi>Оформить заказ</bdi>
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="cart__content">
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
                              <tr>
                                <td className="cart__image-block">
                                  <div className="cart__table-image">
                                    <a href="/product/roborock-vacuum-cleaner-s7-white">
                                      <img
                                        alt=""
                                        title=""
                                        src="https://973f0ebc2f4cec1318e0-33f939a34f35a5788da19fefac41f961.ssl.cf3.rackcdn.com/robot-pylesos-roboro-pgOecVSB.jpeg"
                                        width="150"
                                        height="150"
                                      />
                                    </a>
                                  </div>
                                </td>
                                <td className="cart__content-description">
                                  <a
                                    href="/product/roborock-vacuum-cleaner-s7-white"
                                    className="cart__product-title"
                                  >
                                    Робот-пылесос Roborock Vacuum Cleaner S7 (White)
                                  </a>
                                  <a className="cart__product-delete" title="Удалить">
                                    <span className="icon-cancel-circle"></span>
                                  </a>
                                  <div className="cart__product-sku">
                                    КОД:
                                    <span> 398765432</span>
                                  </div>
                                </td>

                                <td className="cart__product-price">
                                  <bdi>
                                    <span>19 999.00</span>
                                    <span> ₴</span>
                                  </bdi>
                                </td>

                                <td className="cart__product-qty">
                                  <div className="quantity">
                                    <div className="quantity__changer">
                                      <a className="quantity__increase">+</a>
                                      <input
                                        type="text"
                                        value="1"
                                        className="quantity__decimal"
                                        data-ca-min-qty="1"
                                      />
                                      <a className="quantity__decrease">−</a>
                                    </div>
                                  </div>
                                </td>

                                <td className="cart__product-price">
                                  <bdi>
                                    <span>19 999.00</span>
                                    <span> ₴</span>
                                  </bdi>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="cart__total">
                      <div className="cart__total-wrapper">
                        <div className="cart__coupons">
                          <div>
                            <form className="cart__processed-form" action="" method="post">
                              <div className="cart__hint">
                                <label className="cart__hint-label">Промо-код</label>
                                <input type="text" className="cart__hint-text" value="" />
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
                                <span>19 999.00 ₴</span>
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
                                <span>19 999.00</span>
                                <span> ₴</span>
                              </bdi>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="cart__buttons-container">
                      <div className="cart__left-buttons">
                        <a href="/" className="button button-second">
                          <bdi>Продолжить покупки</bdi>
                        </a>
                        <a className="button" href="/">
                          <bdi>Очистить корзину</bdi>
                        </a>
                      </div>
                      <div className="cart__right-buttons">
                        <a href="/" className="button">
                          <span className="icon-ok"></span>
                          <bdi>Оформить заказ</bdi>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Cart };
