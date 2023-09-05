import { ProductAllData, Product } from '../types';

const mapProduct = (product: ProductAllData): Product => {
  const images = product.masterVariant.images.map((image) => image.url);
  const price =
    product.masterVariant.prices.length > 0
      ? product.masterVariant.prices[0].value.centAmount
      : 1000;

  const discountedPrice = product.masterVariant.prices[0].discounted
    ? product.masterVariant.prices[0].discounted.value.centAmount
    : false;

  const categories = product.categories.map((cat) => cat.id) || [];
  const brand =
    product.masterVariant.attributes.find((attr) => attr.name === 'brand')?.value.key || '';
  const color =
    product.masterVariant.attributes.find((attr) => attr.name === 'color')?.value.key || '';
  const sku = product.masterVariant.sku || '';
  return {
    id: product.id,
    name: product.name?.ru || '',
    description: product.description?.ru || '',
    slug: product.slug?.ru || '',
    price,
    ...(discountedPrice ? { discountedPrice } : {}),
    images,
    brand,
    color,
    sku,
    categories,
  };
};

export { mapProduct };
