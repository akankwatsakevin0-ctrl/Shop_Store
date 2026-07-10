// ─── Product Types ───────────────────────────────────────────────────────────

/**
 * Represents a product in the e-commerce catalog.
 */
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

/**
 * Supported product categories.
 */
export type ProductCategory = 'electronics' | 'clothing' | 'books' | 'home-goods';

/**
 * Query parameters accepted by the GET /api/products endpoint.
 */
export interface ProductQueryParams {
  category?: ProductCategory;
  search?: string;
}

// ─── Cart Types ──────────────────────────────────────────────────────────────

/**
 * Represents a single item in the shopping cart.
 */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

/**
 * The shopping cart holding items for a session.
 */
export interface Cart {
  items: CartItem[];
  total: number;
}

/**
 * Request body for adding an item to the cart.
 */
export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

// ─── API Response Types ──────────────────────────────────────────────────────

/**
 * Standard error response body.
 */
export interface ErrorResponse {
  status: 'error';
  message: string;
  details?: string;
}

/**
 * Wrapper for successful single-item responses.
 */
export interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

/**
 * Wrapper for successful list responses.
 */
export interface SuccessListResponse<T> {
  status: 'success';
  count: number;
  data: T[];
}

// ─── Express Augmentation ────────────────────────────────────────────────────

// Augment Express Request to support our typed request body parsing.
declare global {
  namespace Express {
    interface Request {
      parsedBody?: unknown;
    }
  }
}
