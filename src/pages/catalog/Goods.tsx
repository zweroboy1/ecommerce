import fire from '../../assets/img/tovar1.png';

type GoodsProps = {
  currentSort: string;
  selectedFilters: Record<number, string | number>;
};

const Goods: React.FC<GoodsProps> = ({ currentSort, selectedFilters }) => {
  const goods = [
    {
      productName: 'Apple iPhone',
      productFeatures: ['Черный', 'Темно-синий'],
      brand: 'Apple',
      imageUrl: fire,
      amount: 'В наличии',
      oldPrice: '200',
      discountedPrice: '100',
    },
    {
      productName: 'Xiaomi',
      productFeatures: ['Золото', 'Серебро'],
      brand: 'Xiaomi',
      imageUrl: fire,
      amount: 'В наличии',
      oldPrice: '300',
      discountedPrice: '200',
    },
  ];

  // Применение сортировки к товарам
  const sortedGoods = [...goods];

  if (currentSort === 'priceAsc') {
    sortedGoods.sort((a, b) => parseInt(a.discountedPrice, 10) - parseInt(b.discountedPrice, 10));
  } else if (currentSort === 'priceDesc') {
    sortedGoods.sort((a, b) => parseInt(b.discountedPrice, 10) - parseInt(a.discountedPrice, 10));
  } else if (currentSort === 'nameAsc') {
    sortedGoods.sort((a, b) => a.productName.localeCompare(b.productName));
  } else if (currentSort === 'nameDesc') {
    sortedGoods.sort((a, b) => b.productName.localeCompare(a.productName));
  }

  // Применение фильтров к товарам
  const filteredGoods = sortedGoods.filter((good) => {
    const discountedPriceNumber = Number(good.discountedPrice);

    if (
      Array.isArray(selectedFilters[1]) &&
      selectedFilters[1].length === 0 &&
      Array.isArray(selectedFilters[2]) &&
      selectedFilters[2].length === 0
    ) {
      return true;
    }

    // Фильтрация по бренду
    if (selectedFilters[1] && good.brand !== undefined) {
      const brandFilters = Array.isArray(selectedFilters[1])
        ? selectedFilters[1]
        : [selectedFilters[1]];
      if (!brandFilters.includes(good.brand)) {
        return false;
      }
    }

    // Фильтрация по цвету
    if (
      selectedFilters[2] &&
      !good.productFeatures.some((feature) => {
        const selectedColors = Array.isArray(selectedFilters[2])
          ? selectedFilters[2]
          : [selectedFilters[2]];
        return selectedColors.includes(feature);
      })
    ) {
      return false;
    }

    // Фильтрация по цене
    if (
      selectedFilters[3] !== undefined &&
      (discountedPriceNumber < Number(selectedFilters[3]) ||
        discountedPriceNumber > Number(selectedFilters[3]))
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="goods">
      {filteredGoods.map((good, index) => (
        <div className="goods__card" key={index}>
          <div className="goods__image">
            <a href="#">
              <img src={good.imageUrl} alt={good.productName} />
            </a>
          </div>
          <div className="goods__info">
            <h2 className="goods__name">
              <a className="goods__title" href="#">
                {good.productName}
              </a>
            </h2>
            <div className="goods__features">
              {good.productFeatures.map((feature, innerIndex) => (
                <span key={innerIndex}>{feature}</span>
              ))}
            </div>
            <div className="goods__amount">{good.amount}</div>
            <div className="goods__prices">
              <div className="goods__price-block">
                <span className="goods__discounted-price">$ {good.discountedPrice}</span>
                <span className="goods__old-price">$ {good.oldPrice}</span>
              </div>
              <div className="goods__control">
                <i className="goods__control-icon cart__icon header-icon"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Goods };
