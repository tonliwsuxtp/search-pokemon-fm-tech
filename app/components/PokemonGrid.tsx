import {
  getPokemonList,
  getPokemonListByType,
} from "@/app/lib/graphql";
import { sortPokemon, PAGE_SIZE } from "@/app/lib/utils";
import type { SortOrder } from "@/app/lib/utils";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  search: string;
  type: string;
  page: number;
  sort: SortOrder;
}

export default async function PokemonGrid({
  search,
  type,
  page,
  sort,
}: PokemonGridProps) {
  const offset = (page - 1) * PAGE_SIZE;

  const pokemon = type
    ? await getPokemonListByType(type, PAGE_SIZE, offset)
    : await getPokemonList(search, PAGE_SIZE, offset);

  const sorted = sortPokemon(pokemon, sort);

  if (sorted.length === 0) {
    const reason = type ? `type "${type}"` : `"${search}"`;
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl">😕</p>
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">
          No Pokémon found for {reason}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Try a different name, type, or clear your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {sorted.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
