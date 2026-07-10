// ─── CartContext ─────────────────────────────────────────────────────────────
// React Context + Provider for shopping cart state management.
// Persists cart to localStorage and syncs with the backend API.
// ──────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { type Product, type CartItem } from '../types';
import { addToCart as apiAddToCart } from '../api/cart';

// ─── Context Shape ───────────────────────────────────────────────────────────

export interface CartContextValue {
  /** Array of items currently in the cart. */
  items: CartItem[];
  /** Total price of all items. */
  total: number;
  /** Total number of individual items (sum of quantities). */
  itemCount: number;
  /** Whether the cart sidebar is open. */
  isOpen: boolean;

  // ── Actions ──────────────────────────────────────────────────────────────
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  /** Set of product IDs that were just added (for button animation). */
  recentlyAdded: ReadonlySet<string>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ecommerce-cart';

/**
 * Load persisted cart from localStorage.
 */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Calculate the total from an array of items.
 */
function calcTotal(items: CartItem[]): number {
  return Number(
    items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2),
  );
}

/**
 * Calculate the sum of all item quantities.
 */
function calcItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// ─── Context ─────────────────────────────────────────────────────────────────

export const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<Set<string>>(new Set());

  // ── Persist to localStorage whenever items change ─────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // ── addItem ───────────────────────────────────────────────────────────────
  const addItem = useCallback((product: Product, quantity = 1) => {
    // Optimistic local update
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      const newItem: CartItem = {
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      };
      return [...prev, newItem];
    });

    // Trigger "recently added" animation for ~1.2 s
    setRecentlyAdded((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setRecentlyAdded((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1200);

    // Sync with backend (fire-and-forget)
    apiAddToCart(product.id, quantity).catch((err: Error) => {
      console.warn('Backend cart sync failed:', err.message);
    });
  }, []);

  // ── removeItem ────────────────────────────────────────────────────────────
  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // ── updateQuantity ────────────────────────────────────────────────────────
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  // ── clearCart ─────────────────────────────────────────────────────────────
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // ── Sidebar visibility ────────────────────────────────────────────────────
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  // ── Derived values ────────────────────────────────────────────────────────
  const total = calcTotal(items);
  const itemCount = calcItemCount(items);

  // ── Context value ─────────────────────────────────────────────────────────
  const value: CartContextValue = {
    items,
    total,
    itemCount,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    recentlyAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
