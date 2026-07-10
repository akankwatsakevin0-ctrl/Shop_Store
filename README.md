# 🛒 E-Commerce Store — Full-Stack Application

A full-stack e-commerce platform built with **Node.js**, **Express**, **TypeScript** (backend) and **React**, **Vite**, **Tailwind CSS** (frontend).

## ✨ Features

### Backend API
- ✅ RESTful product catalog (list, filter by category, search by name)
- ✅ In-memory shopping cart (add, get, remove items with stock validation)
- ✅ 15 sample products across 4 categories
- ✅ Full TypeScript strict mode
- ✅ CORS enabled
- ✅ Clean error handling middleware
- ✅ Health-check endpoint

### Frontend
- ✅ Product listing with grid layout and responsive design
- ✅ Live search, category filter, and price range filter
- ✅ Shopping cart sidebar with quantity controls
- ✅ Cart persistence via localStorage
- ✅ "Added to Cart" button animation feedback
- ✅ Cart badge with animated pop effect
- ✅ Mock checkout flow with payment form
- ✅ 3-step checkout: Form → Processing → Success
- ✅ Form validation with auto-formatting (card number, expiry)
- ✅ Loading skeletons, empty states, and error handling with retry
- ✅ Built with **React 18**, **TanStack Query v5**, **Tailwind CSS 3**, **lucide-react**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```bash
# Install backend dependencies (from root)
npm install

# Install frontend dependencies
cd client && npm install
cd ..
```

### Start development servers

**Option 1: Start both (recommended)**
```bash
# Terminal 1 — Backend (port 5000)
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

**Option 2: Start backend only**
```bash
npm run dev
```
The server starts on **http://localhost:3001** by default. Use `PORT=5000 npm run dev` to change the port.

### Build for production
```bash
npm run build
cd client && npm run build
```

## 🏗️ Project Structure

```
ecommerce/
├── server/                    # Backend (Express + TypeScript)
│   └── src/
│       ├── index.ts           # Entry point, Express app setup
│       ├── types.ts           # Shared TypeScript interfaces
│       ├── data/products.ts   # In-memory product data (15 items)
│       ├── routes/
│       │   ├── products.ts    # Product endpoints
│       │   └── cart.ts        # Cart endpoints
│       └── middleware/
│           └── errorHandler.ts # Global error handler
├── client/                    # Frontend (React + Vite + Tailwind)
│   └── src/
│       ├── App.tsx            # Root component with layout
│       ├── api/               # API client functions
│       ├── components/        # React components
│       ├── context/           # Cart context + provider
│       └── types/             # Frontend type definitions
├── package.json               # Root scripts
├── tsconfig.json              # Backend TypeScript config
└── README.md
```

## 📡 API Reference

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

## 🧪 Testing

All features have been manually tested end-to-end:
- Product listing, filtering, and search
- Add to cart with animation feedback
- Quantity increase/decrease with real-time total updates
- Cart persistence across page reloads (localStorage)
- Complete checkout flow: form → processing → success
- Empty cart state and clear cart functionality

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Backend Framework** | Express.js |
| **Language** | TypeScript (strict mode) |
| **Frontend Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Data Fetching** | TanStack Query v5 |
| **Styling** | Tailwind CSS 3 |
| **Icons** | lucide-react |
| **State Management** | React Context API |

## 📦 Sample Products

| # | Name | Category | Price |
|---|------|----------|-------|
| 1 | Wireless Noise-Cancelling Headphones | Electronics | $249.99 |
| 2 | 4K Ultra HD Webcam | Electronics | $129.99 |
| 3 | Portable Bluetooth Speaker | Electronics | $79.99 |
| 4 | Smart Mechanical Keyboard | Electronics | $149.99 |
| 5 | Classic Fit Oxford Shirt | Clothing | $59.99 |
| 6 | Slim Fit Chino Pants | Clothing | $49.99 |
| 7 | Merino Wool Sweater | Clothing | $89.99 |
| 8 | Waterproof Rain Jacket | Clothing | $129.99 |
| 9 | Atomic Habits | Books | $16.99 |
| 10 | Clean Code | Books | $39.99 |
| 11 | The Great Gatsby | Books | $12.99 |
| 12 | Stainless Steel French Press | Home Goods | $34.99 |
| 13 | Bamboo Cutting Board Set | Home Goods | $29.99 |
| 14 | Scented Soy Candle Collection | Home Goods | $24.99 |
| 15 | Linen Throw Blanket | Home Goods | $44.99 |
