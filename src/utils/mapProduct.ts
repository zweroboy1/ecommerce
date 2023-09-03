import { ProductAllData, Product } from '../types';

const mapProduct = (product: ProductAllData): Product => {
  const images = product.masterVariant.images.map((image) => image.url);
  const price =
    product.masterVariant.prices.length > 0
      ? product.masterVariant.prices[0].value.centAmount
      : 1000;

  return {
    id: product.id,
    name: product.name?.ru || '',
    description: product.description?.ru || '',
    slug: product.slug?.ru || '',
    price,
    images,
  };
};

export { mapProduct };
