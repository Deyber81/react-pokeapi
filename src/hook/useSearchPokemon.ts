import { useState } from "react";
import { searchPokemon } from "../services/pokemonService";
import type { PokemonDetail } from "../types/pokemon";

export const useSearchPokemon = () => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (name: string) => {
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const result = await searchPokemon(name);
      setPokemon(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Pokémon no encontrado");
      }
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, loading, error, search };
};
