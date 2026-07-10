// ─── Sample Product Data ─────────────────────────────────────────────────────
// In-memory product catalog. Replace with database queries when ready.
// ──────────────────────────────────────────────────────────────────────────────

import { Product } from '../types';

/**
 * Generates a deterministic timestamp offset so products appear dated realistically.
 * Each product is spaced ~1 day apart.
 */
const daysAgo = (days: number): string =>
  new Date(Date.now() - days * 86_400_000).toISOString();

/**
 * Pre-populated product catalog spanning four categories.
 */
export const products: Product[] = [
  // ── Electronics ──────────────────────────────────────────────────────────
  {
    id: 'prod-001',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable memory-foam ear cushions. Supports Bluetooth 5.2 and multipoint connection.',
    category: 'electronics',
    imageUrl: 'https://placehold.co/400x400?text=Headphones',
    stock: 45,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
  {
    id: 'prod-002',
    name: '4K Ultra HD Webcam',
    price: 129.99,
    description:
      'Professional-grade 4K webcam with auto-focus, built-in ring light, and noise-reducing dual microphones. Ideal for streaming, video conferences, and content creation.',
    category: 'electronics',
    imageUrl: 'https://placehold.co/400x400?text=Webcam',
    stock: 78,
    createdAt: daysAgo(28),
    updatedAt: daysAgo(28),
  },
  {
    id: 'prod-003',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    description:
      'Rugged, waterproof Bluetooth speaker with 360° sound, 20-hour playtime, and a built-in power bank. Perfect for outdoor adventures and poolside parties.',
    category: 'electronics',
    imageUrl: 'https://placehold.co/400x400?text=Speaker',
    stock: 120,
    createdAt: daysAgo(25),
    updatedAt: daysAgo(25),
  },
  {
    id: 'prod-004',
    name: 'Smart Mechanical Keyboard',
    price: 149.99,
    description:
      'Hot-swappable mechanical keyboard with per-key RGB lighting, PBT double-shot keycaps, and a CNC aluminium frame. Supports QMK/VIA for full customisation.',
    category: 'electronics',
    imageUrl: 'https://placehold.co/400x400?text=Keyboard',
    stock: 62,
    createdAt: daysAgo(22),
    updatedAt: daysAgo(22),
  },

  // ── Clothing ─────────────────────────────────────────────────────────────
  {
    id: 'prod-005',
    name: 'Classic Fit Oxford Shirt',
    price: 59.99,
    description:
      'Timeless 100% cotton Oxford shirt with a button-down collar and chest pocket. Pre-washed for a soft, lived-in feel from day one.',
    category: 'clothing',
    imageUrl: 'https://placehold.co/400x400?text=Oxford+Shirt',
    stock: 200,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
  {
    id: 'prod-006',
    name: 'Slim Fit Chino Pants',
    price: 49.99,
    description:
      'Stretch-cotton chinos with a modern slim fit. Features a mid-rise waist, tapered leg, and reinforced seams for everyday durability.',
    category: 'clothing',
    imageUrl: 'https://placehold.co/400x400?text=Chinos',
    stock: 150,
    createdAt: daysAgo(18),
    updatedAt: daysAgo(18),
  },
  {
    id: 'prod-007',
    name: 'Merino Wool Sweater',
    price: 89.99,
    description:
      'Lightweight, breathable merino wool crew-neck sweater. Temperature-regulating and odour-resistant—ideal for travel or the office.',
    category: 'clothing',
    imageUrl: 'https://placehold.co/400x400?text=Sweater',
    stock: 85,
    createdAt: daysAgo(15),
    updatedAt: daysAgo(15),
  },
  {
    id: 'prod-008',
    name: 'Waterproof Rain Jacket',
    price: 129.99,
    description:
      'Fully seam-sealed rain jacket with a DWR finish, adjustable hood, and pit zips for ventilation. Packs into its own pocket for easy storage.',
    category: 'clothing',
    imageUrl: 'https://placehold.co/400x400?text=Rain+Jacket',
    stock: 95,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(12),
  },

  // ── Books ─────────────────────────────────────────────────────────────────
  {
    id: 'prod-009',
    name: 'Atomic Habits',
    price: 16.99,
    description:
      'The #1 New York Times bestseller by James Clear. A practical guide to building good habits, breaking bad ones, and mastering the tiny behaviours that lead to remarkable results.',
    category: 'books',
    imageUrl: 'https://placehold.co/400x400?text=Atomic+Habits',
    stock: 300,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: 'prod-010',
    name: 'Clean Code',
    price: 39.99,
    description:
      'Robert C. Martin\'s seminal handbook of agile software craftsmanship. Learn to write code that is readable, maintainable, and robust.',
    category: 'books',
    imageUrl: 'https://placehold.co/400x400?text=Clean+Code',
    stock: 180,
    createdAt: daysAgo(8),
    updatedAt: daysAgo(8),
  },
  {
    id: 'prod-011',
    name: 'The Great Gatsby',
    price: 12.99,
    description:
      'F. Scott Fitzgerald\'s classic American novel set in the Jazz Age. A haunting story of love, wealth, and the American Dream.',
    category: 'books',
    imageUrl: 'https://placehold.co/400x400?text=Great+Gatsby',
    stock: 250,
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
  },

  // ── Home Goods ────────────────────────────────────────────────────────────
  {
    id: 'prod-012',
    name: 'Stainless Steel French Press',
    price: 34.99,
    description:
      'Double-wall insulated French press that keeps coffee hot for hours. Features a fine-mesh filter and 1-litre capacity. Dishwasher safe.',
    category: 'home-goods',
    imageUrl: 'https://placehold.co/400x400?text=French+Press',
    stock: 140,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
  {
    id: 'prod-013',
    name: 'Bamboo Cutting Board Set',
    price: 29.99,
    description:
      'Set of three organic bamboo cutting boards in different sizes. Knife-friendly, naturally antimicrobial, and featuring deep juice grooves.',
    category: 'home-goods',
    imageUrl: 'https://placehold.co/400x400?text=Cutting+Boards',
    stock: 220,
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
  },
  {
    id: 'prod-014',
    name: 'Scented Soy Candle Collection',
    price: 24.99,
    description:
      'Hand-poured soy wax candle trio in Lavender, Vanilla Bean, and Cedar & Sage. Each burns for 45+ hours in a recyclable glass jar.',
    category: 'home-goods',
    imageUrl: 'https://placehold.co/400x400?text=Candles',
    stock: 310,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'prod-015',
    name: 'Linen Throw Blanket',
    price: 44.99,
    description:
      'Stonewashed 100% French linen throw blanket. Lightweight yet warm, available in a curated palette of earthy tones. 130 cm × 180 cm.',
    category: 'home-goods',
    imageUrl: 'https://placehold.co/400x400?text=Throw+Blanket',
    stock: 75,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
];
