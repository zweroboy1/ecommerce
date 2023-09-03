import { NavLink } from 'react-router-dom';
import { Product } from '../types';

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="goods">
      {products.map((product) => (
        <div key={product.id} className="goods__card">
          <div className="goods__image">
            <NavLink to={`/product/${product.slug}`}>
              <img src={product.images[0]} alt={product.name} />
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
                <span className="goods__discounted-price">
                  UAH {(product.price / 100).toFixed(2)}
                </span>
                <span className="goods__old-price">
                  UAH {(product.price / 100 + 100).toFixed(2)}
                </span>
              </div>
              <div className="goods__control">
                <i className="goods__control-icon cart__icon header-icon"></i>
              </div>
            </div>
            <div>{product.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ProductList };
