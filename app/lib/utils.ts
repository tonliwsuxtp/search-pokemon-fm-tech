import type { PokemonListItem } from "./types";

export type SortOrder = "id" | "name";

export const PAGE_SIZE = 24;

export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

/** Sort a list of Pokémon by id (default) or alphabetically by name. */
export function sortPokemon(
  list: PokemonListItem[],
  by: SortOrder
): PokemonListItem[] {
  return [...list].sort((a, b) =>
    by === "name" ? a.name.localeCompare(b.name) : a.id - b.id
  );
}

/** Calculate the zero-based offset for a given 1-based page number. */
export function pageOffset(page: number): number {
  return (page - 1) * PAGE_SIZE;
}

/** Total number of pages given a total item count. */
export function totalPages(count: number): number {
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

/** Clamp a page number to the valid range [1, max]. */
export function clampPage(page: number, max: number): number {
  return Math.min(Math.max(1, page), max);
}

export const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400 text-white",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-white",
  rock: "bg-yellow-800 text-white",
  ghost: "bg-purple-700 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-gray-700 text-white",
  steel: "bg-gray-400 text-white",
  fairy: "bg-pink-300 text-black",
};

export const TYPE_BG_COLORS: Record<string, string> = {
  normal: "bg-gray-100",
  fire: "bg-orange-50",
  water: "bg-blue-50",
  electric: "bg-yellow-50",
  grass: "bg-green-50",
  ice: "bg-cyan-50",
  fighting: "bg-red-50",
  poison: "bg-purple-50",
  ground: "bg-yellow-50",
  flying: "bg-indigo-50",
  psychic: "bg-pink-50",
  bug: "bg-lime-50",
  rock: "bg-amber-50",
  ghost: "bg-purple-50",
  dragon: "bg-indigo-50",
  dark: "bg-gray-100",
  steel: "bg-gray-50",
  fairy: "bg-pink-50",
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? "bg-gray-300 text-white";
}

export function getCardBgColor(primaryType: string): string {
  return TYPE_BG_COLORS[primaryType] ?? "bg-gray-50";
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(4, "0")}`;
}

export function formatStatName(name: string): string {
  const map: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  return map[name] ?? name;
}
