// ─── E-Commerce API Server ───────────────────────────────────────────────────
// Entry point for the Express backend.
// ──────────────────────────────────────────────────────────────────────────────

import express, { Express } from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import { globalErrorHandler } from './middleware/errorHandler';

// ─── Configuration ──────────────────────────────────────────────────────────

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────────────────────────────────────

// Parse JSON request bodies
app.use(express.json());

// Enable CORS for all origins (restrict in production)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);

// ─── Health Check ───────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ─────────────────────────────────────────────────────────────────

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// ─── 404 Handler ────────────────────────────────────────────────────────────
// Catch-all for undefined routes.

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// ─── Global Error Handler ───────────────────────────────────────────────────
// Must be registered last.

app.use(globalErrorHandler);

// ─── Start Server ───────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 E-Commerce API server listening on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   CORS origin: ${process.env.CORS_ORIGIN || '*'}`);
});

export default app;
