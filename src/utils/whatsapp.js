import { formatPrice } from './formatters';

export const formatWAOrderMessage = (product, currency) => {
  return `Hello! I'd like to place an order 🛍️

*${product.name}*
💰 Price: ${formatPrice(product.price, currency)}

Please confirm availability and we can proceed. Thank you! 🙏`;
};

export const getWAUrl = (phone, message) => {
  const cleanPhone = phone.replace(/[^\d+]/g, ''); // Ensure only digits and '+' remain
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
