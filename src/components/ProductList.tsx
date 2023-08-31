import { useEffect, useState } from 'react';
import { Product } from '../types';
import { getProducts } from '../services/commercetoolsApi';
import { mapProduct } from '../utils/mapProduct';

interface ProductListProps {
  category: string;
}

/*
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
*/
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
function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProductsFromServer() {
      try {
        const response = await getProducts(category);
        // console.log(response);
        const fetchedProducts = response.map((el) => mapProduct(el));

        // console.log(category, fetchedProducts);
        // setProducts(shuffleArray(fetchedProducts));
        setProducts(fetchedProducts);
      } catch (error) {
        // console.log(error);
      }
    }
    getProductsFromServer();
  }, [category]);

  /*
  return (
    <div>
      <h2>Products in {category}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            ${product.images[0]}
          </li>
        ))}
      </ul>
    </div>
  );
*/

  return (
    <div className="goods">
      {products.map((product) => (
        <div key={product.id} className="goods__card">
          <div className="goods__image">
            <a href="#">
              <img src={product.images[0]} alt={product.name} />
            </a>
          </div>
          <div className="goods__info">
            <h2 className="goods__name">
              <a className="goods__title" href="#">
                {product.name}
              </a>
            </h2>
            <div className="goods__prices">
              <div className="goods__price-block">
                <span className="goods__discounted-price">$ {product.price}</span>
                <span className="goods__old-price">$ {product.price + 100}</span>
              </div>
              <div className="goods__control">
                <i className="goods__control-icon cart__icon header-icon"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
