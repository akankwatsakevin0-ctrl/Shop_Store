// ─── ProductList ─────────────────────────────────────────────────────────────
// Main product listing page: fetches products from the API, manages filter
// state, and renders the grid of product cards.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { type ProductCategory, DEFAULT_FILTERS } from '../types';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';

export default function ProductList() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState(DEFAULT_FILTERS.search);
  const [category, setCategory] = useState<ProductCategory | null>(
    DEFAULT_FILTERS.category,
  );
  const [minPrice, setMinPrice] = useState<number | null>(
    DEFAULT_FILTERS.minPrice,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    DEFAULT_FILTERS.maxPrice,
  );

  // ── Derived filter object ─────────────────────────────────────────────────
  const filters = useMemo(
    () => ({ search, category, minPrice, maxPrice }),
    [search, category, minPrice, maxPrice],
  );

  const hasActiveFilters =
    search !== '' || category !== null || minPrice !== null || maxPrice !== null;

  // ── Data fetching ─────────────────────────────────────────────────────────
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 30_000, // 30s before re-fetch
  });

  // ── Filter reset ──────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setSearch(DEFAULT_FILTERS.search);
    setCategory(DEFAULT_FILTERS.category);
    setMinPrice(DEFAULT_FILTERS.minPrice);
    setMaxPrice(DEFAULT_FILTERS.maxPrice);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-red-600">
          Failed to load products
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {(error as Error)?.message ?? 'An unexpected error occurred'}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="btn-primary mt-6"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state (successful fetch but no results)
  const hasNoResults = !isLoading && products && products.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Products
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse our collection and add items to your cart.
        </p>
      </div>

      {/* Filters toolbar */}
      <div className="mb-8">
        <ProductFilters
          search={search}
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onReset={handleReset}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Product count */}
      {!isLoading && products && (
        <p className="mb-4 text-sm text-gray-500">
          Showing{' '}
          <span className="font-medium text-gray-900">{products.length}</span>{' '}
          {products.length === 1 ? 'product' : 'products'}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : hasNoResults ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 11.625l2.25-2.25M12 11.625l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-900">
            No products found
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="btn-primary mt-6"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products!.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
