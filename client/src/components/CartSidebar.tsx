// ─── CartSidebar ─────────────────────────────────────────────────────────────
// Slide-in sidebar drawer that shows the full cart contents — item list,
// quantity controls, total, and checkout button.
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useCallback, type ReactNode } from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';
import CartItemRow from './CartItemRow';

/**
 * Format a price value as USD currency string.
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

interface CartSidebarProps {
  /** Called when the user clicks the "Checkout" button. */
  onCheckout: () => void;
}

export default function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { items, total, itemCount, isOpen, closeCart, clearCart } = useCart();

  // ── Close on Escape key ─────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    },
    [closeCart],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling while sidebar is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">
              Cart
              {itemCount > 0 && (
                <span className="ml-1.5 text-sm font-normal text-gray-500">
                  ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            {/* Clear cart */}
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear cart
              </button>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-gray-900">
                Subtotal
              </span>
              <span className="text-xl font-bold text-gray-900 tabular-nums">
                {formatPrice(total)}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-gray-500">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout button */}
            <button
              type="button"
              onClick={onCheckout}
              className="btn-primary mt-4 w-full gap-2 py-3 text-base"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyCart(): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ShoppingBag className="h-16 w-16 text-gray-300" />
      <p className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</p>
      <p className="mt-1 text-sm text-gray-500">
        Add some products to get started!
      </p>
    </div>
  );
}
