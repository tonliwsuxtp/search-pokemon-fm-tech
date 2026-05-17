export default function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-gray-100 p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-800">
      <div className="h-28 w-28 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mt-2 h-3 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-1 h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-2 flex gap-1">
        <div className="h-5 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function PokemonGridSkeleton({ count = 24 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}
