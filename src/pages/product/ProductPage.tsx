import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';
import { getProduct } from '../../services/commercetoolsApi';
import { mapProduct } from '../../utils/mapProduct';
import { Product } from '../../types';
import { NotFound } from '../NotFound';
import { ProductDescription } from './ProductDescription';
import { ProductImages } from './ProductImages';
import { ProductDetails } from './ProductDetails';

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
      <main className="main content">
        <div className="row">
          <div className="breadcrumbs">
            <a href="/" className="breadcrumbs__link">
              <bdi>Главная</bdi>
            </a>
            <span className="breadcrumbs__slash">/</span>
            <a href="" className="breadcrumbs__link">
              <bdi>Категория</bdi>
            </a>
            <span className="breadcrumbs__slash">/</span>
            <span className="breadcrumbs__current">
              <bdi>{product.name}</bdi>
            </span>
          </div>
          <div className="row product">
            <div className="left product__images">
              <ProductImages productImages={product.images} />
            </div>
            <div className="right product__details">
              <h1>{product.name}</h1>
              <ProductDetails
                price={product.price}
                discountedPrice={product.discountedPrice}
                brand={product.brand}
                color={product.color}
                sku={product.sku}
              />
              <ProductDescription description={product.description} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

export { ProductPage };
