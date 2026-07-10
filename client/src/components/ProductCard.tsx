// ─── ProductCard ─────────────────────────────────────────────────────────────
// A single product card showing image, name, price, category, and an "Add to
// Cart" button. Uses the cart context for instant add-to-cart with animation.
// ──────────────────────────────────────────────────────────────────────────────

import { Product } from '../types';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/useCart';

interface ProductCardProps {
  product: Product;
}

/**
 * Format a price value as USD currency string.
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Capitalise the first letter of a category slug for display.
 */
function formatCategory(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, recentlyAdded } = useCart();
  const isAdded = recentlyAdded.has(product.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm">
          {formatCategory(product.category)}
        </span>

        {/* Out-of-stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-900 shadow">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={() => addItem(product, 1)}
            disabled={product.stock === 0}
            className={`btn-primary gap-1.5 transition-all duration-200 ${
              isAdded
                ? 'scale-105 bg-green-600 hover:bg-green-700 focus-visible:outline-green-600'
                : ''
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
