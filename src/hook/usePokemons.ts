import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

export const usePokemons = (limit = 20, offset = 0) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPokemons(limit, offset)
      .then(setPokemons)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limit, offset]);

  return { pokemons, loading, error };
};
