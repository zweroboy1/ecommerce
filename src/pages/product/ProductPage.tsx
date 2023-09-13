import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';
import { getProduct } from '../../services/commercetoolsApi';
import { mapProduct } from '../../utils/mapProduct';
import { Product, Category } from '../../types';
import { NotFound } from '../NotFound';
import { Loader } from '../Loader';
import { ProductDescription } from './ProductDescription';
import { ProductImages } from './ProductImages';
import { ProductDetails } from './ProductDetails';
import { MAIN_ROUTE } from '../../constants/route';
import { CATEGORIES } from '../../constants/categories';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNotfound, setIsNotfound] = useState(false);
  const [subcategory, setSubcategory] = useState<Category | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    async function getProductsFromServer() {
      try {
        setLoading(true);
        const fetchedProduct = await getProduct(productId);
        if (fetchedProduct) {
          const mappedProduct = mapProduct(fetchedProduct);
          setProduct(mappedProduct);
          setSubcategory(CATEGORIES.filter((cat) => cat.ctId === mappedProduct.categories[0])[0]);
          setCategory(CATEGORIES.filter((cat) => cat.ctId === mappedProduct.categories[1])[0]);
        } else {
          setProduct(null);
          setIsNotfound(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    }
    getProductsFromServer();
  }, [productId]);

  return isNotfound ? (
    <NotFound />
  ) : (
    <div className="tygh">
      <Top />
      <Header />
      <ToastContainer />
      {loading && <Loader />}
      {product && (
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

              {category && subcategory && (
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
              )}
              {!category && subcategory && (
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
                  id={product.id}
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
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;

export { ProductPage };
