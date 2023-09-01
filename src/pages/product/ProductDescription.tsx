interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <div className="product__description">
      <h2>Описание товара</h2>
      <div className="product__description-txt">{description}</div>
    </div>
  );
};

export { ProductDescription };
