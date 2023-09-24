const formatPrice = (price: number): string => {
  return price
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export { formatPrice };
