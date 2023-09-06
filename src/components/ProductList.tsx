import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';

function ProductList({ products }: { products: Product[] }) {
  const [isHoveredMap, setIsHoveredMap] = useState<{ [key: string]: boolean }>({});
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);

  const handleImageMouseEnter = (productId: string) => {
    setIsHoveredMap((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const handleImageMouseLeave = (productId: string) => {
    setIsHoveredMap((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  const handleCardMouseEnter = (productId: string) => {
    setExpandedDescription(productId);
  };

  const handleCardMouseLeave = () => {
    setExpandedDescription(null);
  };

  return (
    <div className="goods">
      {products.map((product) => (
        <div
          key={product.id}
          className="goods__card"
          onMouseEnter={() => handleCardMouseEnter(product.id)}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="goods__wrapper">
            <div
              className="goods__image"
              onMouseEnter={() => handleImageMouseEnter(product.id)}
              onMouseLeave={() => handleImageMouseLeave(product.id)}
            >
              <NavLink to={`/product/${product.slug}`}>
                <img
                  src={
                    isHoveredMap[product.id] && product.images[1]
                      ? product.images[1]
                      : product.images[0]
                  }
                  alt={product.name}
                />
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
              <div className="goods__description">
                <div className="goods__description1">
                  {expandedDescription === product.id ? (
                    product.description
                  ) : (
                    <>
                      {product.description.length > 70 ? (
                        <>{product.description.substring(0, 70)}...</>
                      ) : (
                        product.description
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ProductList };
