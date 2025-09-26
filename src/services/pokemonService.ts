import { pokeApi } from "../api/pokeApi";

export const getPokemons = async (limit = 20, offset = 0) => {
  const { data } = await pokeApi.get(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
};
