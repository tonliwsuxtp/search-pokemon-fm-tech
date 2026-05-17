import Image from "next/image";
import Link from "next/link";
import { getCardBgColor, getTypeColor, formatPokemonId } from "@/app/lib/utils";
import { getOfficialArtworkUrl } from "@/app/lib/graphql";
import type { PokemonListItem } from "@/app/lib/types";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType =
    pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name ?? "normal";
  const bgColor = getCardBgColor(primaryType);
  const artworkUrl = getOfficialArtworkUrl(pokemon.id);

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`group flex flex-col items-center rounded-2xl p-4 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${bgColor}`}
    >
      <div className="relative h-28 w-28">
        <Image
          src={artworkUrl}
          alt={pokemon.name}
          fill
          sizes="112px"
          className="object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-110"
        />
      </div>

      <p className="mt-2 text-xs font-medium text-gray-400">
        {formatPokemonId(pokemon.id)}
      </p>

      <h2 className="mt-0.5 text-sm font-semibold capitalize text-gray-800 dark:text-gray-100">
        {pokemon.name}
      </h2>

      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
          <span
            key={pokemon_v2_type.name}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getTypeColor(pokemon_v2_type.name)}`}
          >
            {pokemon_v2_type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
