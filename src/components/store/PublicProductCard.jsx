import { ShoppingCart, ArrowRight, Eye, Check, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function PublicProductCard({ product, onOrder }) {
  const { storeSlug } = useParams();
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      className="h-full flex flex-col group group/card border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[var(--radius-xl)] bg-white overflow-hidden"
    >
      {/* Image Section */}
      <Link to={`/store/${storeSlug}/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-[var(--surface-bg)]">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Availability Badge Overlay */}
        {!product.is_available && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[4px] flex items-center justify-center z-10">
            <Badge variant="muted" className="bg-black text-white px-4 py-1.5 rounded-full font-black text-[10px]">
              OUT OF STOCK
            </Badge>
          </div>
        )}

        {/* Add to Cart Button - Shows on hover/touch */}
        {product.is_available && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center z-20">
            <button
              onClick={handleAddToCart}
              className="bg-white text-black px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {inCart ? <Check size={18} /> : <Plus size={18} />}
              {inCart ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        )}

        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-[var(--text-primary)]">
            <Eye size={18} />
          </div>
        </div>

        {/* Floating Price Tag */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-mono font-black text-lg shadow-xl">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display font-black text-xl text-[var(--text-primary)] mb-2 tracking-tight group-hover/card:text-[var(--brand-primary)] transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-6 font-medium leading-relaxed">
          {product.description || "Premium quality item available for instant order."}
        </p>

        <div className="mt-auto">
          <Button
            variant={product.is_available ? 'primary' : 'secondary'}
            size="lg"
            className="w-full gap-2 rounded-2xl group/btn py-4"
            disabled={!product.is_available}
            onClick={() => onOrder(product)}
          >
            <ShoppingCart size={18} className="group-hover/btn:-rotate-12 transition-transform" />
            <span className="font-black uppercase tracking-[0.1em] text-xs">
              {product.is_available ? 'Order via WhatsApp' : 'Restocking Soon'}
            </span>
            <ArrowRight size={16} className="ml-auto opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
