// ─── Products Router ─────────────────────────────────────────────────────────
// Handles all /api/products endpoints including filtering and search.
// ──────────────────────────────────────────────────────────────────────────────

import { Router, Request, Response, NextFunction } from 'express';
import { products } from '../data/products';
import { ProductQueryParams } from '../types';

const router = Router();

/**
 * GET /api/products
 * Returns all products, optionally filtered by category and/or search term.
 *
 * Query parameters:
 *   - category  : filter by product category (e.g. "electronics")
 *   - search    : case-insensitive search against product name
 *
 * Examples:
 *   GET /api/products
 *   GET /api/products?category=electronics
 *   GET /api/products?search=laptop
 *   GET /api/products?category=books&search=clean
 */
router.get(
  '/',
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { category, search } = req.query as unknown as ProductQueryParams;
      let result = [...products];

      // Filter by category if provided
      if (category) {
        const normalizedCategory = category.toLowerCase();
        result = result.filter(
          (product) => product.category === normalizedCategory,
        );

        if (result.length === 0) {
          res.status(404).json({
            status: 'error',
            message: `No products found in category '${category}'`,
          });
          return;
        }
      }

      // Search by name if provided
      if (search) {
        const searchTerm = search.toLowerCase().trim();
        result = result.filter((product) =>
          product.name.toLowerCase().includes(searchTerm),
        );

        if (result.length === 0) {
          res.status(404).json({
            status: 'error',
            message: `No products found matching '${search}'`,
          });
          return;
        }
      }

      res.json({
        status: 'success',
        count: result.length,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * GET /api/products/:id
 * Returns a single product by its ID.
 *
 * Example:
 *   GET /api/products/prod-001
 */
router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const product = products.find((p) => p.id === id);

      if (!product) {
        res.status(404).json({
          status: 'error',
          message: `Product with id '${id}' not found`,
        });
        return;
      }

      res.json({
        status: 'success',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
