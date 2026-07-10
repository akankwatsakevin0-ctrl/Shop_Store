// ─── useCart ─────────────────────────────────────────────────────────────────
// Custom hook that provides easy access to the CartContext.
// Throws a descriptive error if used outside of <CartProvider>.
// ──────────────────────────────────────────────────────────────────────────────

import { useContext } from 'react';
import { CartContext, type CartContextValue } from './CartContext';

/**
 * Hook for consuming the cart context anywhere in the component tree.
 *
 * @example
 * ```tsx
 * const { items, addItem, itemCount } = useCart();
 * ```
 */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      'useCart must be used within a <CartProvider>. ' +
        'Wrap your component tree with <CartProvider>.',
    );
  }
  return ctx;
}
