import { useEffect, useState } from "react";
import { getPokemonDetails } from "../services/pokemonService";
import type { PokemonDetail } from "../types/pokemon";

export const usePokemonDetails = (name: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    setLoading(true);
    getPokemonDetails(name)
      .then(setPokemon)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  return { pokemon, loading, error };
};
