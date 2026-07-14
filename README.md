# E-Commerce Store

[![Live Demo](https://img.shields.io/badge/Live-Demo-38BDF8?style=for-the-badge&logo=render)](https://shop-store-api-9clw.onrender.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A full-stack e-commerce platform with a RESTful product catalog, shopping cart, and mock checkout flow. Built with TypeScript throughout — Express backend and React frontend with Vite and Tailwind CSS.

**Live:** [https://shop-store-api-9clw.onrender.com](https://shop-store-api-9clw.onrender.com)

---

## Features

### Backend API
- RESTful product catalog with category filtering and name search
- Server-side shopping cart with stock validation
- 15 sample products across Electronics, Clothing, Books, and Home Goods
- TypeScript strict mode, CORS enabled, error handling middleware
- Health-check endpoint

### Frontend
- Product grid layout with live search, category filter, and price range filter
- Shopping cart sidebar with quantity controls and localStorage persistence
- Cart badge with animated pop effect
- 3-step checkout flow: form (with validation and auto-formatting) -> processing -> success
- Loading skeletons, empty states, and error handling with retry
- Built with React 18, TanStack Query v5, Tailwind CSS 3, and lucide-react

---

## Project Structure

```
├── server/                  # Express + TypeScript backend
│   └── src/
│       ├── index.ts         # Entry point, Express app setup
│       ├── types.ts         # Shared TypeScript interfaces
│       ├── data/products.ts # In-memory product seed data (15 items)
│       ├── routes/          # Product and cart route handlers
│       └── middleware/      # Global error handler
├── client/                  # React + Vite + Tailwind frontend
│   └── src/
│       ├── App.tsx          # Root component with layout
│       ├── api/             # API client functions
│       ├── components/      # React UI components
│       ├── context/         # Cart context + provider
│       └── types/           # Frontend type definitions
├── render.yaml              # Render deployment config
├── tsconfig.json            # Backend TypeScript config
├── build.sh                 # Render build script
└── package.json             # Root workspace scripts
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Backend** | Express.js, TypeScript (strict mode) |
| **Frontend** | React 18, TypeScript, Vite 5, TanStack Query v5 |
| **Styling** | Tailwind CSS 3, lucide-react |
| **State** | React Context API |

---

## Quick Start

```bash
git clone https://github.com/akankwatsakevin0-ctrl/Shop_Store.git
cd Shop_Store

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..

# Terminal 1: Backend (http://localhost:3001)
npm run dev

# Terminal 2: Frontend (http://localhost:5173)
cd client && npm run dev
```

---

## API Reference

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products?category=electronics` | Filter by category |
| `GET` | `/api/products?search=laptop` | Search by name |
| `GET` | `/api/products/:id` | Get product by ID |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get current cart |
| `POST` | `/api/cart` | Add item to cart |
| `DELETE` | `/api/cart/:cartItemId` | Remove item from cart |

**POST `/api/cart` body:**
```json
{
  "productId": "prod-001",
  "quantity": 2
}
```

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |

---

## Environment Variables

The server supports the following environment variables. Create a `.env` file in the project root:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | — | `3001` | Server listen port |
| `CORS_ORIGIN` | — | `*` | Allowed CORS origin (set to your domain in production) |
| `NODE_ENV` | — | `development` | Environment mode (`production` enables static frontend serving) |

---

## Testing

All features have been manually tested end-to-end:
- Product listing, filtering, and search
- Add to cart with stock validation
- Quantity controls with real-time total updates
- Cart persistence across page reloads
- Complete checkout flow: form → processing → success
- Empty cart state and clear cart functionality

---

## License

MIT
