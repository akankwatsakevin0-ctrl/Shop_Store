// ─── PriceRangeFilter ────────────────────────────────────────────────────────
// Min / Max price input fields for narrowing product results.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  minPrice: number | null;
  maxPrice: number | null;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
}

export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState<string>(
    minPrice !== null ? String(minPrice) : '',
  );
  const [localMax, setLocalMax] = useState<string>(
    maxPrice !== null ? String(maxPrice) : '',
  );

  // Sync local state when parent resets
  useEffect(() => {
    setLocalMin(minPrice !== null ? String(minPrice) : '');
    setLocalMax(maxPrice !== null ? String(maxPrice) : '');
  }, [minPrice, maxPrice]);

  function handleMinBlur() {
    const parsed = localMin === '' ? null : Number(localMin);
    onMinChange(parsed !== null && !isNaN(parsed) ? parsed : null);
  }

  function handleMaxBlur() {
    const parsed = localMax === '' ? null : Number(localMax);
    onMaxChange(parsed !== null && !isNaN(parsed) ? parsed : null);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="price-min">
        Minimum price
      </label>
      <input
        id="price-min"
        type="number"
        min={0}
        step={0.01}
        placeholder="Min $"
        value={localMin}
        onChange={(e) => setLocalMin(e.target.value)}
        onBlur={handleMinBlur}
        className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />

      <span className="text-gray-400">—</span>

      <label className="sr-only" htmlFor="price-max">
        Maximum price
      </label>
      <input
        id="price-max"
        type="number"
        min={0}
        step={0.01}
        placeholder="Max $"
        value={localMax}
        onChange={(e) => setLocalMax(e.target.value)}
        onBlur={handleMaxBlur}
        className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
    </div>
  );
}
