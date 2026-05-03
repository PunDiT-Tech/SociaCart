export const formatPrice = (price, currency = '₦') => {
  const num = parseFloat(price);
  if (isNaN(num)) return `${currency}0`;
  return `${currency}${num.toLocaleString()}`;
};

export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
