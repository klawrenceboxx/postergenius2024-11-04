export const calculatePriceRange = (sizes: { price: number }[]) => {
  const prices = sizes.map((s) => s.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const calculateTotalQuantity = (sizes: { quantity: number }[]) => {
  return sizes.reduce((total, size) => total + size.quantity, 0);
};
