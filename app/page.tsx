import { Suspense } from "react";
import SearchBar from "@/app/components/SearchBar";
import TypeFilter from "@/app/components/TypeFilter";
import PokemonGrid from "@/app/components/PokemonGrid";
import Pagination from "@/app/components/Pagination";
import { PokemonGridSkeleton } from "@/app/components/PokemonCardSkeleton";
import {
  getPokemonCount,
  getPokemonCountByType,
} from "@/app/lib/graphql";
import {
  clampPage,
  pageOffset,
  totalPages,
  PAGE_SIZE,
} from "@/app/lib/utils";
import type { SortOrder } from "@/app/lib/utils";
import SortSelect from "@/app/components/SortSelect";

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    page?: string;
    sort?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, type, page, sort } = await searchParams;

  const query = q ?? "";
  const activeType = type ?? "";
  const sortOrder: SortOrder = sort === "name" ? "name" : "id";

  const count = activeType
    ? await getPokemonCountByType(activeType)
    : await getPokemonCount(query);

  const pages = totalPages(count);
  const currentPage = clampPage(Number(page) || 1, pages);
  const offset = pageOffset(currentPage);

  const suspenseKey = `${query}-${activeType}-${currentPage}-${sortOrder}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Pokédex
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Search and explore all Pokémon
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <SearchBar defaultValue={query} />
      </div>

      {/* Type filter */}
      <div className="mb-6">
        <Suspense>
          <TypeFilter />
        </Suspense>
      </div>

      {/* Sort + result count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {count} Pokémon
          {activeType && <> · type: <span className="font-medium capitalize">{activeType}</span></>}
          {query && <> · &ldquo;{query}&rdquo;</>}
        </p>

        <Suspense>
          <SortSelect current={sortOrder} />
        </Suspense>

      </div>

      {/* Grid */}
      <Suspense key={suspenseKey} fallback={<PokemonGridSkeleton />}>
        <PokemonGrid
          search={query}
          type={activeType}
          page={currentPage}
          sort={sortOrder}
        />
      </Suspense>

      {/* Pagination */}
      <div className="mt-10">
        <Suspense>
          <Pagination currentPage={currentPage} totalPages={pages} />
        </Suspense>
      </div>
    </main>
  );
}

