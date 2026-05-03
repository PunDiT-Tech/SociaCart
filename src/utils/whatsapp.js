import { formatPrice } from './formatters';

/**
 * Format a WhatsApp message for a single product order
 */
export const formatSingleProductMessage = (product, currency) => {
  return `Hello! I'd like to place an order 🛍️

*${product.name}*
💰 Price: ${formatPrice(product.price, currency)}

Please confirm availability and we can proceed. Thank you! 🙏`;
};

/**
 * Alias for backward compatibility
 * @deprecated Use formatSingleProductMessage instead
 */
export const formatWAOrderMessage = formatSingleProductMessage;

/**
 * Format a WhatsApp message for multiple products (cart checkout)
 */
export const formatCartMessage = (cartItems, currency, storeName) => {
  const itemList = cartItems.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    return `${index + 1}. *${item.name}*
   Qty: ${item.quantity} × ${formatPrice(item.price, currency)} = ${formatPrice(itemTotal, currency)}`;
  }).join('\n\n');

  const grandTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return `Hello! I'd like to place an order from ${storeName || 'your store'} 🛍️

*Order Summary:*
${itemList}

━━━━━━━━━━━━━━━━━━━━
*Total: ${formatPrice(grandTotal, currency)}*
━━━━━━━━━━━━━━━━━━━━

Items: ${cartItems.length} product${cartItems.length > 1 ? 's' : ''}

Please confirm availability and total amount. Thank you! 🙏`;
};

/**
 * Get WhatsApp URL with encoded message
 */
export const getWAUrl = (phone, message) => {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Format phone number for display
 */
export const formatPhoneDisplay = (phone) => {
  if (!phone) return '';
  const clean = phone.replace(/[^\d+]/g, '');
  return clean;
};
