import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../types';
import { getProducts } from '../services/commercetoolsApi';
import { mapProduct } from '../utils/mapProduct';

interface ProductListProps {
  category: string;
  currentSort: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Моковая функция getProducts
/*
function getProducts(): Product[] {
  return [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 150 },
    { id: 4, name: 'Product 4', price: 300 },
    { id: 5, name: 'Product 5', price: 120 },
    { id: 6, name: 'Product 6', price: 130 },
    { id: 7, name: 'Product 7', price: 220 },
    { id: 8, name: 'Product 8', price: 500 },
  ];
}
*/

function sortProducts(products: Product[], sortOption: string): Product[] {
  const sortedProducts = [...products];

  switch (sortOption) {
    case 'priceAsc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'nameAsc':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDesc':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      return shuffleArray(sortedProducts);
  }

  return sortedProducts;
}

function ProductList({ category, currentSort }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProductsFromServer() {
      try {
        const response = await getProducts(category);

        const fetchedProducts = response.map((el) => mapProduct(el));
        // console.log(fetchedProducts);
        const sortedProducts = sortProducts(fetchedProducts, currentSort);

        setProducts(sortedProducts);
      } catch (error) {
        // Обработка ошибок
      }
    }
    getProductsFromServer();
  }, [category, currentSort]);

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

export default ProductList;
