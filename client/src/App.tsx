// ─── App ─────────────────────────────────────────────────────────────────────
// Root application component: sets up React Query and Cart providers, renders
// the page shell (header + product listing + cart sidebar).
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import { ShoppingCart } from 'lucide-react';

// Create a single Query Client instance for the app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// ─── Header (inner component so it can consume the cart context) ─────────────

function Header() {
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-[55] border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">ShopStore</span>
        </div>

        {/* Cart icon with badge */}
        <button
          type="button"
          onClick={toggleCart}
          className="relative rounded-lg p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label={`Open cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
        >
          <ShoppingCart className="h-6 w-6 text-gray-700" />

          {itemCount > 0 && (
            <span
              key={itemCount}
              className="cart-badge absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white animate-badge-pop"
            >
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <ProductList />
          </main>
          <CartSidebar onCheckout={openCheckout} />
          <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
