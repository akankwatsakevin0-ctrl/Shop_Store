# E-Commerce Backend API

## Tech Stack
- Node.js + Express + TypeScript
- In-memory data store (database integration planned)

## Project Structure
- `server/src/index.ts` - Entry point, Express app setup
- `server/src/types.ts` - Shared TypeScript interfaces
- `server/src/data/` - In-memory data (products)
- `server/src/routes/` - Express route handlers
- `server/src/middleware/` - Error handling middleware

## Scripts
- `npm run dev` - Run with ts-node (development)
- `npm run build` - Compile TypeScript to dist/
- `npm start` - Run compiled JS

## API Endpoints
- `GET /api/products` - All products (supports ?category=&search=)
- `GET /api/products/:id` - Single product
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:id` - Remove from cart
