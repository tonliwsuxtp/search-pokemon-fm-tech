export interface PokemonType {
  name: string;
}

export interface SpritesData {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface PokemonListItem {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: Array<{
    pokemon_v2_type: PokemonType;
  }>;
  pokemon_v2_pokemonsprites: Array<{
    sprites: string;
  }>;
}

export interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

export interface PokemonDetail extends PokemonListItem {
  height: number;
  weight: number;
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemonstats: PokemonStat[];
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}
