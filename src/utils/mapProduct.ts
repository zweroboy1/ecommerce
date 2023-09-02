import { ProductAllData, Product } from '../types';

const mapProduct = (product: ProductAllData): Product => {
  const currentVariant = product.masterData.current.masterVariant;
  const images = currentVariant.images.map((image) => image.url);
  const price = currentVariant.prices.length > 0 ? currentVariant.prices[0].value.centAmount : 1000;

  return {
    id: product.id,
    name: product.masterData.current.name?.ru || '',
    description: product.masterData.current.description?.ru || '',
    slug: product.masterData.current.slug?.ru || '',
    price,
    images,
  };
};

export { mapProduct };
