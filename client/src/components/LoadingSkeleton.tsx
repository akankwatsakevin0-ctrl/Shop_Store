// ─── LoadingSkeleton ─────────────────────────────────────────────────────────
// Animated placeholder cards shown while product data is being fetched.
// ──────────────────────────────────────────────────────────────────────────────

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* Image placeholder */}
          <div className="aspect-square rounded-t-2xl bg-gray-200" />

          {/* Text placeholders */}
          <div className="space-y-3 p-4">
            <div className="h-3 w-20 rounded-full bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="flex items-center justify-between pt-2">
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-9 w-28 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
