import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPokemonByName, getOfficialArtworkUrl } from "@/app/lib/graphql";
import {
  formatPokemonId,
  formatStatName,
  getCardBgColor,
  getTypeColor,
} from "@/app/lib/utils";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  if (!pokemon) {
    return { title: "Pokémon not found" };
  }

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${displayName} — Pokédex`,
    description: `View stats, types, and abilities for ${displayName}.`,
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  if (!pokemon) {
    notFound();
  }

  const primaryType =
    pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name ?? "normal";
  const bgColor = getCardBgColor(primaryType);
  const artworkUrl = getOfficialArtworkUrl(pokemon.id);
  const maxStat = 255;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Pokédex
      </Link>

      <div
        className={`overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 ${bgColor}`}
      >
        <div className="flex flex-col items-center px-6 pt-10 pb-6 sm:flex-row sm:items-end sm:gap-8">
          <div className="relative h-44 w-44 flex-shrink-0">
            <Image
              src={artworkUrl}
              alt={pokemon.name}
              fill
              sizes="176px"
              priority
              className="object-contain drop-shadow-xl"
            />
          </div>

          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <p className="text-sm font-medium text-gray-400">
              {formatPokemonId(pokemon.id)}
            </p>
            <h1 className="text-4xl font-bold capitalize text-gray-900 dark:text-white">
              {pokemon.name}
            </h1>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
                <span
                  key={pokemon_v2_type.name}
                  className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getTypeColor(pokemon_v2_type.name)}`}
                >
                  {pokemon_v2_type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-black/5 bg-white/60 px-6 py-4 dark:bg-black/20 sm:grid-cols-4">
          <Stat label="Height" value={`${pokemon.height / 10} m`} />
          <Stat label="Weight" value={`${pokemon.weight / 10} kg`} />
          <div className="col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Abilities
            </p>
            <p className="mt-1 capitalize text-gray-800 dark:text-gray-100">
              {pokemon.pokemon_v2_pokemonabilities
                .map((a) => a.pokemon_v2_ability.name.replace("-", " "))
                .join(", ")}
            </p>
          </div>
        </div>

        <div className="border-t border-black/5 bg-white/60 px-6 py-6 dark:bg-black/20">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Base Stats
          </h2>
          <div className="space-y-3">
            {pokemon.pokemon_v2_pokemonstats.map(
              ({ base_stat, pokemon_v2_stat }) => (
                <div key={pokemon_v2_stat.name} className="flex items-center gap-3">
                  <span className="w-20 text-right text-xs font-medium text-gray-500">
                    {formatStatName(pokemon_v2_stat.name)}
                  </span>
                  <span className="w-8 text-right text-sm font-bold text-gray-800 dark:text-gray-100">
                    {base_stat}
                  </span>
                  <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${(base_stat / maxStat) * 100}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  );
}
