import { PokemonGridSkeleton } from "@/app/components/PokemonCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mb-8 flex justify-center">
        <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
      </div>
      <PokemonGridSkeleton />
    </main>
  );
}
