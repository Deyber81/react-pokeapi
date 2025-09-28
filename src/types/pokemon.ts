export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { slot: number; type: { name: string; url: string } }[];
}
