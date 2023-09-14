import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { ButtonIcon } from './ButtonIcon';
import { Context } from '../store/Context';
import Notification from './Notification';

function ProductList({ products }: { products: Product[] }) {
  const { user } = useContext(Context);
  const isAuth = user?.isAuth;
  const userCard = isAuth ? user?.user?.card : null;
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

  return products.length === 0 ? (
    <p className="no-product">Нет продуктов, удовлетворяющих заданным условиям</p>
  ) : (
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
                      <span className="goods__old-price">{formatPrice(product.price / 100)} ₴</span>

                      <span className="goods__discounted-price">
                        {formatPrice(product.discountedPrice / 100)} ₴
                      </span>
                    </>
                  ) : (
                    <span className="goods__price">{formatPrice(product.price / 100)} ₴</span>
                  )}
                </div>
                <ButtonIcon
                  className="goods__control"
                  onClick={() => openModal(product.name, product.price, product.images[0])}
                  type="button"
                  disabled={isAuth && userCard?.some((item) => item.product.id === product.id)}
                  title="Добавить в карзину"
                >
                  <i className="goods__control-icon cart__icon header-icon"></i>
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
  );
}

export { ProductList };
