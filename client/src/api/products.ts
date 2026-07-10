// ─── API Service ─────────────────────────────────────────────────────────────
// Functions for fetching product data from the backend.
// ──────────────────────────────────────────────────────────────────────────────

import { Product, ProductFilters } from '../types';

const API_BASE = '/api';

/**
 * Generic fetch wrapper with error handling.
 */
async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ?? `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}

/**
 * Build query string from the current filter state.
 */
function buildQueryString(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set('category', filters.category);
  }
  if (filters.search) {
    params.set('search', filters.search);
  }

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Fetch all products, optionally filtered by category and/or search term.
 * NOTE: Price filtering is done client-side since the backend doesn't
 *       support min/max price query parameters yet.
 */
export async function fetchProducts(
  filters: ProductFilters,
): Promise<Product[]> {
  const qs = buildQueryString(filters);
  const data = await fetchJson<{
    status: string;
    count: number;
    data: Product[];
  }>(`${API_BASE}/products${qs}`);

  let products = data.data;

  // Client-side price range filtering
  if (filters.minPrice !== null) {
    products = products.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== null) {
    products = products.filter((p) => p.price <= filters.maxPrice!);
  }

  return products;
}

/**
 * Fetch a single product by its ID.
 */
export async function fetchProduct(id: string): Promise<Product> {
  const data = await fetchJson<{ status: string; data: Product }>(
    `${API_BASE}/products/${id}`,
  );
  return data.data;
}
