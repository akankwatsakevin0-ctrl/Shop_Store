// ─── Cart API Service ────────────────────────────────────────────────────────
// Functions for managing the shopping cart via the backend.
// ──────────────────────────────────────────────────────────────────────────────

import { Cart } from '../types';

const API_BASE = '/api';

/**
 * Fetch the current cart.
 */
export async function fetchCart(): Promise<Cart> {
  const response = await fetch(`${API_BASE}/cart`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  const data = await response.json();
  return data.data;
}

/**
 * Add a product to the cart.
 */
export async function addToCart(
  productId: string,
  quantity: number,
): Promise<Cart> {
  const response = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? 'Failed to add item to cart');
  }

  const data = await response.json();
  return data.data;
}

/**
 * Remove an item from the cart by its cart-item ID.
 */
export async function removeFromCart(cartItemId: string): Promise<Cart> {
  const response = await fetch(`${API_BASE}/cart/${cartItemId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }

  const data = await response.json();
  return data.data;
}
