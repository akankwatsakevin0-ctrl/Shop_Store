// ─── Cart Router ─────────────────────────────────────────────────────────────
// Simple in-memory shopping cart. Cart state resets when the server restarts.
// Replace with a database-backed solution for production.
// ──────────────────────────────────────────────────────────────────────────────

import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { products } from '../data/products';
import { Cart, CartItem, AddToCartRequest } from '../types';

const router = Router();

/**
 * In-memory cart storage.
 * Keyed by a session/cart ID — for this demo we use a single shared cart.
 * In a real app you would associate carts with user sessions or accounts.
 */
const cart: Cart = {
  items: [],
  total: 0,
};

/**
 * Recalculates the cart total from its items.
 */
function recalculateTotal(): void {
  cart.total = Number(
    cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
  );
}

/**
 * GET /api/cart
 * Returns the current cart contents and total.
 */
router.get('/', (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/cart
 * Adds an item to the cart (or increments its quantity if already present).
 *
 * Request body (JSON):
 *   { "productId": "prod-001", "quantity": 2 }
 */
router.post(
  '/',
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { productId, quantity } = req.body as AddToCartRequest;

      // ── Validation ──────────────────────────────────────────────────────
      if (!productId || typeof productId !== 'string') {
        res.status(400).json({
          status: 'error',
          message: 'Missing or invalid required field: productId',
        });
        return;
      }

      const qty = Number(quantity);
      if (!Number.isInteger(qty) || qty < 1) {
        res.status(400).json({
          status: 'error',
          message: 'quantity must be a positive integer',
        });
        return;
      }

      // ── Look up product ─────────────────────────────────────────────────
      const product = products.find((p) => p.id === productId);
      if (!product) {
        res.status(404).json({
          status: 'error',
          message: `Product with id '${productId}' not found`,
        });
        return;
      }

      // ── Check stock availability ────────────────────────────────────────
      const existingItem = cart.items.find(
        (item) => item.productId === productId,
      );
      const currentQtyInCart = existingItem ? existingItem.quantity : 0;

      if (currentQtyInCart + qty > product.stock) {
        res.status(400).json({
          status: 'error',
          message: `Insufficient stock. Available: ${product.stock - currentQtyInCart}`,
        });
        return;
      }

      // ── Add or update item ──────────────────────────────────────────────
      if (existingItem) {
        existingItem.quantity += qty;
      } else {
        const newItem: CartItem = {
          id: uuidv4(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: qty,
          imageUrl: product.imageUrl,
        };
        cart.items.push(newItem);
      }

      recalculateTotal();

      res.status(201).json({
        status: 'success',
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * DELETE /api/cart/:id
 * Removes a single item from the cart by its cart-item ID.
 *
 * Example:
 *   DELETE /api/cart/<cart-item-uuid>
 */
router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const itemIndex = cart.items.findIndex((item) => item.id === id);

      if (itemIndex === -1) {
        res.status(404).json({
          status: 'error',
          message: `Cart item with id '${id}' not found`,
        });
        return;
      }

      cart.items.splice(itemIndex, 1);
      recalculateTotal();

      res.json({
        status: 'success',
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
