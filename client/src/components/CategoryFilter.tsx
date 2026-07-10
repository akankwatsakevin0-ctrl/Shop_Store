// ─── CategoryFilter ──────────────────────────────────────────────────────────
// Horizontal row of pill buttons for filtering by product category.
// ──────────────────────────────────────────────────────────────────────────────

import { ProductCategory } from '../types';

interface CategoryFilterProps {
  categories: { label: string; value: ProductCategory | null }[];
  selected: ProductCategory | null;
  onSelect: (category: ProductCategory | null) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = selected === cat.value;
        return (
          <button
            key={cat.label}
            type="button"
            onClick={() => onSelect(cat.value)}
            className={`btn-filter ${
              isActive
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
