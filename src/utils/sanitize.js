import DOMPurify from 'dompurify';

export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

export const sanitizeSlug = (input) => {
  return sanitizeText(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
};

export const sanitizePhone = (phone) => {
  return phone.replace(/[^\d+]/g, '').slice(0, 15);
};

export const sanitizePrice = (value) => {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return 0;
  return Math.min(Math.round(num * 100) / 100, 9_999_999);
};
