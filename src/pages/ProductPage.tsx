import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import { getProduct } from '../services/commercetoolsApi';
import { mapProduct } from '../utils/mapProduct';
import { Product } from '../types';
import { NotFound } from './NotFound';

const ProductPage = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProductsFromServer() {
      try {
        const fetchedProduct = await getProduct(productId);
        if (fetchedProduct) {
          const mappedProduct = mapProduct(fetchedProduct);
          setProduct(mappedProduct);
        } else {
          setProduct(null); // Устанавливаем продукт в null, если не найден
        }
      } catch (error) {
        // Обработка ошибок при запросе продукта
      } finally {
        setLoading(false); // Устанавливаем loading в false в любом случае
      }
    }
    getProductsFromServer();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>; // Нужен ли нам лоадер? в каталоге я не делал, а тут подумал, что может надо?
  }

  if (product === null) {
    return <NotFound />;
  }

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <div>тут крошки вставь просто хтмлом, я потом допилю</div>
        <hr />
        <h1>{product.name}</h1>
        <div>{product.description}</div>
        <hr />
        <b>UAH {(product.price / 100).toFixed(2)}</b>
        <hr />
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`${product.name} photo #${index}`} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

export { ProductPage };
