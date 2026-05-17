import { cacheLife, cacheTag } from "next/cache";
import type { PokemonDetail, PokemonListItem } from "./types";

const GRAPHQL_ENDPOINT = "https://beta.pokeapi.co/graphql/v1beta";

async function gql<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

// ── Queries ──────────────────────────────────────────────────────────────────

const LIST_POKEMON_QUERY = `
  query ListPokemon($search: String!, $limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _ilike: $search } }
      order_by: { id: asc }
    ) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

const LIST_POKEMON_BY_TYPE_QUERY = `
  query ListPokemonByType($type: String!, $limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
      }
      order_by: { id: asc }
    ) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

const COUNT_POKEMON_QUERY = `
  query CountPokemon($search: String!) {
    pokemon_v2_pokemon_aggregate(
      where: { name: { _ilike: $search } }
    ) {
      aggregate { count }
    }
  }
`;

const COUNT_POKEMON_BY_TYPE_QUERY = `
  query CountPokemonByType($type: String!) {
    pokemon_v2_pokemon_aggregate(
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
      }
    ) {
      aggregate { count }
    }
  }
`;

const GET_POKEMON_QUERY = `
  query GetPokemon($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability { name }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat { name }
      }
    }
  }
`;

// ── Public functions ──────────────────────────────────────────────────────────

/** Fetch a page of Pokémon filtered by name search. */
export async function getPokemonList(
  search: string,
  limit = 24,
  offset = 0
): Promise<PokemonListItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("pokemon-list");

  const pattern = search.trim() ? `%${search.trim()}%` : "%";
  const data = await gql<{ pokemon_v2_pokemon: PokemonListItem[] }>(
    LIST_POKEMON_QUERY,
    { search: pattern, limit, offset }
  );
  return data.pokemon_v2_pokemon;
}

/** Fetch a page of Pokémon filtered by type (e.g. "fire"). */
export async function getPokemonListByType(
  type: string,
  limit = 24,
  offset = 0
): Promise<PokemonListItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(`pokemon-type-${type}`);

  const data = await gql<{ pokemon_v2_pokemon: PokemonListItem[] }>(
    LIST_POKEMON_BY_TYPE_QUERY,
    { type, limit, offset }
  );
  return data.pokemon_v2_pokemon;
}

/** Total number of Pokémon matching a name search (used for pagination). */
export async function getPokemonCount(search: string): Promise<number> {
  "use cache";
  cacheLife("hours");
  cacheTag("pokemon-count");

  const pattern = search.trim() ? `%${search.trim()}%` : "%";
  const data = await gql<{
    pokemon_v2_pokemon_aggregate: { aggregate: { count: number } };
  }>(COUNT_POKEMON_QUERY, { search: pattern });
  return data.pokemon_v2_pokemon_aggregate.aggregate.count;
}

/** Total number of Pokémon of a given type (used for pagination). */
export async function getPokemonCountByType(type: string): Promise<number> {
  "use cache";
  cacheLife("hours");
  cacheTag(`pokemon-count-type-${type}`);

  const data = await gql<{
    pokemon_v2_pokemon_aggregate: { aggregate: { count: number } };
  }>(COUNT_POKEMON_BY_TYPE_QUERY, { type });
  return data.pokemon_v2_pokemon_aggregate.aggregate.count;
}

/** Fetch a single Pokémon by exact name. */
export async function getPokemonByName(
  name: string
): Promise<PokemonDetail | null> {
  "use cache";
  cacheLife("days");
  cacheTag(`pokemon-${name}`);

  const data = await gql<{ pokemon_v2_pokemon: PokemonDetail[] }>(
    GET_POKEMON_QUERY,
    { name }
  );
  return data.pokemon_v2_pokemon[0] ?? null;
}

/** Build the official artwork sprite URL from a Pokémon's numeric ID. */
export function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
