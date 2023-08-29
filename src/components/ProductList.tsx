// import {getProducts} from '../services/commercetoolsApi';

import { Product } from '../types';

interface ProductListProps {
  category: string;
}

// Моковая функция getProducts
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

function ProductList({ category }: ProductListProps) {
  // const [products, setProducts] = useState<Product[]>([]);

  const products: Product[] = getProducts();
  //  setProducts(fetchedProducts);

  return (
    <div>
      <h2>Products in {category}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
