import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

export const usePokemons = (limit = 20, offset = 0) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPokemons(limit, offset)
      .then(({ results, total }) => {
        setPokemons(results);
        setTotal(total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limit, offset]);

  return { pokemons, total, loading, error };
};
