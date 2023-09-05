import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
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
import { MAIN_ROUTE } from '../../constants/route';
import { CATEGORIES } from '../../constants/categories';

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
          setProduct(null);
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
    return <div>Loading...</div>;
  }

  if (product === null) {
    return <NotFound />;
  }

  const subcategory = CATEGORIES.filter((cat) => cat.ctId === product.categories[0])[0];
  const category = CATEGORIES.filter((cat) => cat.ctId === product.categories[1])[0];
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main content">
        <div className="row">
          <div className="breadcrumbs">
            <NavLink className="breadcrumbs__link" to={MAIN_ROUTE}>
              Главная
            </NavLink>
            <span className="breadcrumbs__slash">/</span>
            <NavLink className="breadcrumbs__link" to="/catalog">
              Каталог
            </NavLink>
            <span className="breadcrumbs__slash">/</span>

            {category ? (
              <>
                <NavLink className="breadcrumbs__link" to={`/catalog/${category.url}`}>
                  {category.ruName}
                </NavLink>
                <span className="breadcrumbs__slash">/</span>
                <NavLink
                  className="breadcrumbs__link"
                  to={`/catalog/${category.url}/${subcategory.url}`}
                >
                  {subcategory.ruName}
                </NavLink>
              </>
            ) : (
              <NavLink className="breadcrumbs__link" to={`/catalog/${subcategory.url}`}>
                {subcategory.ruName}
              </NavLink>
            )}

            <span className="breadcrumbs__slash">/</span>

            <NavLink className="breadcrumbs__current" to=".">
              {product.name}
            </NavLink>
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
