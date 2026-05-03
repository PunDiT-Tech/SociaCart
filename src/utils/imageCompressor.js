import imageCompression from 'browser-image-compression';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB   = 5;
const TARGET_SIZE_MB = 0.8; 
const MAX_DIMENSION  = 1200; 

export const validateAndCompressImage = async (file) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed.');
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Image must be under ${MAX_SIZE_MB}MB.`);
  }

  const options = {
    maxSizeMB: TARGET_SIZE_MB,
    maxWidthOrHeight: MAX_DIMENSION,
    useWebWorker: true,
    fileType: 'image/webp',
  };

  const compressed = await imageCompression(file, options);
  return compressed;
};

export const createPreviewURL = (file) => URL.createObjectURL(file);
export const revokePreviewURL = (url) => URL.revokeObjectURL(url);
