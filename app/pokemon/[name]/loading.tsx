export default function PokemonDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-md ring-1 ring-black/5 dark:bg-gray-800">
        <div className="flex flex-col items-center px-6 pt-10 pb-6 sm:flex-row sm:items-end sm:gap-8">
          <div className="h-44 w-44 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 flex flex-col gap-3 sm:mt-0">
            <div className="h-4 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-2">
              <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-black/5 bg-white/60 px-6 py-4 dark:bg-black/20 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-1 h-5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>

        <div className="border-t border-black/5 bg-white/60 px-6 py-6 dark:bg-black/20">
          <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-2 flex-1 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
