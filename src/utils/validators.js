export const validateStoreName = (name) => {
  if (!name) return 'Store name is required';
  if (name.length < 2) return 'Store name is too short';
  if (name.length > 50) return 'Store name is too long';
  return null;
};

export const validateProductName = (name) => {
  if (!name) return 'Product name is required';
  if (name.length > 100) return 'Product name is too long';
  return null;
};

export const validateProductPrice = (price) => {
  const num = parseFloat(price);
  if (isNaN(num) || num < 0) return 'Invalid price';
  if (num > 9999999) return 'Price is too high';
  return null;
};
