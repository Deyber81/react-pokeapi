import { useEffect, useState } from "react";
import { getPokemonsByType } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

export const usePokemonByType = (type: string) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) return;

    setLoading(true);
    getPokemonsByType(type)
      .then(setPokemons)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type]);

  return { pokemons, loading, error };
};
