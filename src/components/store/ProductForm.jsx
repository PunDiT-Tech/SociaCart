import { useState } from 'react';
import { Upload, Sparkles, X } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { validateAndCompressImage, createPreviewURL } from '../../utils/imageCompressor';
import toast from 'react-hot-toast';

export default function ProductForm({ 
  initialData, 
  onSubmit, 
  loading,
  uploadProgress 
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    currency: initialData?.currency || '₦',
    description: initialData?.description || '',
    is_available: initialData?.is_available ?? true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || null);

  const currencies = [
    { label: '₦ NGN', value: '₦' },
    { label: '$ USD', value: '$' },
    { label: '£ GBP', value: '£' },
    { label: '€ EUR', value: '€' }
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressed = await validateAndCompressImage(file);
      setImageFile(compressed);
      setImagePreview(createPreviewURL(compressed));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleMagicWrite = () => {
    if (!formData.name) return toast.error("Enter a product name first!");
    const templates = [
      `Premium ${formData.name}. Designed for quality and comfort. Perfect for your daily needs.`,
      `The all-new ${formData.name} is finally here. Best-in-class performance.`,
    ];
    setFormData(prev => ({ ...prev, description: templates[Math.floor(Math.random() * templates.length)] }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData, imageFile); }} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-[var(--text-secondary)] px-1">Product Image</label>
        <div className="relative group aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-card)]">
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full backdrop-blur-md"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-[var(--surface-bg)] transition-colors">
              <Upload size={32} className="text-[var(--text-muted)] mb-2" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>
        {uploadProgress > 0 && <ProgressBar progress={uploadProgress} label="Uploading" />}
      </div>

      <Input 
        label="Product Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[var(--text-secondary)] px-1">Currency</label>
          <select 
            value={formData.currency}
            onChange={e => setFormData({ ...formData, currency: e.target.value })}
            className="w-full bg-[var(--surface-card)] border-2 border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-primary)] outline-none"
          >
            {currencies.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <Input 
          label="Price"
          type="number"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center px-1">
          <label className="text-sm font-bold text-[var(--text-secondary)]">Description</label>
          <button type="button" onClick={handleMagicWrite} className="text-[10px] font-bold text-white bg-purple-600 px-2 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={12} /> Magic Write
          </button>
        </div>
        <Textarea 
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          maxChars={300}
        />
      </div>

      <Button type="submit" size="lg" loading={loading}>
        {initialData ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
}
