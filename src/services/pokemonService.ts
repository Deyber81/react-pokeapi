import { pokeApi } from "../api/pokeApi";
import type { Pokemon, PokemonDetail } from "../types/pokemon";

export const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<Pokemon[]> => {
  const { data } = await pokeApi.get(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data.results;
};

export const getPokemonDetails = async (
  name: string
): Promise<PokemonDetail> => {
  const { data } = await pokeApi.get(`/pokemon/${name.toLowerCase()}`);
  return data;
};

export const getAllTypes = async (): Promise<Pokemon[]> => {
  const { data } = await pokeApi.get(`/type`);
  return data.results;
};

export const getPokemonsByType = async (type: string): Promise<Pokemon[]> => {
  const { data } = await pokeApi.get(`/type/${type.toLowerCase()}`);
  return data.pokemon.map((p: { pokemon: Pokemon }) => p.pokemon);
};
export const searchPokemon = async (name: string): Promise<PokemonDetail> => {
  const { data } = await pokeApi.get(`/pokemon/${name.toLowerCase()}`);
  return data;
};
