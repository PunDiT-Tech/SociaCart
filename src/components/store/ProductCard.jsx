import { Edit2, Trash2, EyeOff, Eye } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function ProductCard({ product, onEdit, onDelete, onToggleAvailability }) {
  return (
    <Card variant="elevated" padding="none" className="group h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-bg)]">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant="muted" className="bg-white/90 text-black border-none">Out of Stock</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(product)}
            className="w-8 h-8 flex items-center justify-center bg-white/90 text-[var(--text-primary)] rounded-full shadow-lg backdrop-blur-md"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => onDelete(product)}
            className="w-8 h-8 flex items-center justify-center bg-red-500/90 text-white rounded-full shadow-lg backdrop-blur-md"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-[var(--text-primary)] line-clamp-1 flex-1 pr-2">
            {product.name}
          </h3>
          <button 
            onClick={() => onToggleAvailability(product)}
            className={`text-xs font-bold transition-colors ${product.is_available ? 'text-[var(--brand-primary)]' : 'text-[var(--color-error)]'}`}
          >
            {product.is_available ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 flex-1">
          {product.description || "No description provided."}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-mono font-extrabold text-[var(--brand-primary-dark)] text-lg">
            {formatPrice(product.price, product.currency)}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span>🛍️ {product.order_count || 0}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
