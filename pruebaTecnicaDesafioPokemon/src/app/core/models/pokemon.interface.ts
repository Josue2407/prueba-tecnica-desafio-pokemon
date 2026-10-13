export interface PokemonResource {
  name: string;
  url: string;
}

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResource[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  url: string;
}