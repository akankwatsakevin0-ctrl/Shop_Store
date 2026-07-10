// ─── CartItemRow ─────────────────────────────────────────────────────────────
// A single row within the cart sidebar — shows product thumbnail, name, price,
// quantity controls, and a remove button.
// ──────────────────────────────────────────────────────────────────────────────

import { Trash2, Minus, Plus } from 'lucide-react';
import { type CartItem } from '../types';
import { useCart } from '../context/useCart';

interface CartItemRowProps {
  item: CartItem;
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

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  const lineTotal = item.price * item.quantity;

  return (
    <div className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
      {/* Thumbnail */}
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Name & Remove */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
            {item.name}
          </h4>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="flex-shrink-0 rounded-lg p-1 text-gray-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Unit price */}
        <p className="text-xs text-gray-500">{formatPrice(item.price)} each</p>

        {/* Quantity controls & line total */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => {
                if (item.quantity <= 1) {
                  removeItem(item.id);
                } else {
                  updateQuantity(item.id, item.quantity - 1);
                }
              }}
              className="rounded-l-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="w-8 text-center text-sm font-medium tabular-nums text-gray-900">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="rounded-r-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-sm font-semibold text-gray-900 tabular-nums">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
