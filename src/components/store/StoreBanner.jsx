import { Share2, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';

export default function StoreBanner({ store, productCount = 0, onShare }) {
  const displayName = store?.store_display_name || store?.store_name || 'Store';
  const category = store?.store_category || 'Catalog';
  const description = store?.store_description || 'Browse products and order directly on WhatsApp.';

  return (
    <header className="relative overflow-hidden bg-[var(--brand-primary)] text-white">
      <div className="absolute inset-0 mesh-gradient opacity-90" />
      <div className="relative px-6 pb-8 pt-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-md">
              <ShoppingBag size={26} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-white/70">{category}</p>
              <h1 className="truncate font-display text-3xl font-black tracking-tight">{displayName}</h1>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-11 w-11 shrink-0 rounded-full border-white/20 bg-white/15 p-0 text-white hover:bg-white/25"
            onClick={onShare}
            aria-label="Share store"
          >
            <Share2 size={18} />
          </Button>
        </div>

        <p className="max-w-md text-sm font-medium leading-6 text-white/85">{description}</p>

        <div className="mt-6 inline-flex items-center rounded-full bg-black/20 px-4 py-2 text-xs font-black uppercase tracking-widest backdrop-blur-md">
          {productCount} {productCount === 1 ? 'Product' : 'Products'}
        </div>
      </div>
    </header>
  );
}
