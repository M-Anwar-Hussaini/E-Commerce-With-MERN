export const getPriceQueryParams = (searchParam, key, value) => {
  const hasValueInParams = searchParam.has(key);
  if (value && hasValueInParams) {
    searchParam.set(key, value);
  } else if (value) {
    searchParam.append(key, value);
  } else if (hasValueInParams) {
    searchParam.delete(key);
  }
  return searchParam;
};

export const caluclateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice,
  };
}; 
