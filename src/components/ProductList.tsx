// import {getProducts} from '../services/commercetoolsApi';

import { Product } from '../types';

interface ProductListProps {
  category: string;
}

// Моковая функция getProducts
function getProducts(): Product[] {
  // Здесь вы можете вернуть какие-то моковые продукты для данной категории
  // В данном случае просто генерируем 4 моковых продукта
  // console.log(category);
  return [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 150 },
    { id: 4, name: 'Product 4', price: 300 },
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
