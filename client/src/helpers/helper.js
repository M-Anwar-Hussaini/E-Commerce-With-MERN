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
