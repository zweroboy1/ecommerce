import { NavLink } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';

function ProductList({ products }: { products: Product[] }) {
  return (
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
                <div className="goods__control">
                  <i className="goods__control-icon cart__icon header-icon"></i>
                </div>
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
