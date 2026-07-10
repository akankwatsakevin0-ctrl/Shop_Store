// ─── Product Types ───────────────────────────────────────────────────────────

export type ProductCategory =
  | 'electronics'
  | 'clothing'
  | 'books'
  | 'home-goods';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: 'success';
  count: number;
  data: Product[];
}

export interface ProductResponse {
  status: 'success';
  data: Product;
}

// ─── Cart Types ──────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartResponse {
  status: 'success';
  data: Cart;
}

// ─── Error Types ─────────────────────────────────────────────────────────────

export interface ApiError {
  status: 'error';
  message: string;
  details?: string;
}

// ─── UI State Types ──────────────────────────────────────────────────────────

export interface ProductFilters {
  search: string;
  category: ProductCategory | null;
  minPrice: number | null;
  maxPrice: number | null;
}

export const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: 'All', value: null },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Books', value: 'books' },
  { label: 'Home', value: 'home-goods' },
];

export const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  category: null,
  minPrice: null,
  maxPrice: null,
};
