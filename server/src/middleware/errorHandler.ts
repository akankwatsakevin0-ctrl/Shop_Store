// ─── Global Error Handler Middleware ─────────────────────────────────────────
// Catches errors thrown (or passed via next(error)) in route handlers and
// returns a consistent JSON error response.
// ──────────────────────────────────────────────────────────────────────────────

import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

/**
 * Global error-handling middleware.
 *
 * Always returns a 500 status with a JSON body. In development you may want
 * to include the stack trace; here we log it server-side and return a
 * safe, user-friendly message.
 */
export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
): void {
  // Log the full error for server-side debugging
  console.error(`[ERROR] ${err.name}: ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  const statusCode = (err as any).statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    message:
      statusCode === 500
        ? 'An unexpected error occurred. Please try again later.'
        : err.message,
    ...(process.env.NODE_ENV !== 'production' && { details: err.stack }),
  });
}

/**
 * Helper to create an HTTP error that the global handler can process.
 */
export class HttpError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
  }
}
