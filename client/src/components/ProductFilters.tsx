// ─── ProductFilters ──────────────────────────────────────────────────────────
// Combines SearchBar, CategoryFilter, and PriceRangeFilter into a single
// toolbar component.
// ──────────────────────────────────────────────────────────────────────────────

import { ProductCategory, CATEGORIES } from '../types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';

interface ProductFiltersProps {
  search: string;
  category: ProductCategory | null;
  minPrice: number | null;
  maxPrice: number | null;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: ProductCategory | null) => void;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function ProductFilters({
  search,
  category,
  minPrice,
  maxPrice,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  hasActiveFilters,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Row 1: Search + Reset */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={onSearchChange} />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
          >
            Reset
          </button>
        )}
      </div>

      {/* Row 2: Category pills + Price range */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryFilter
          categories={CATEGORIES}
          selected={category}
          onSelect={onCategoryChange}
        />

        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={onMinPriceChange}
          onMaxChange={onMaxPriceChange}
        />
      </div>
    </div>
  );
}
