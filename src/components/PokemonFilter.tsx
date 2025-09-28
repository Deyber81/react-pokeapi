import { useEffect, useState } from "react";
import { getAllTypes } from "../services/pokemonService";
import { usePokemonByType } from "../hook/usePokemonByType";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../types/pokemon";

const PokemonFilter = () => {
  const [types, setTypes] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<string>("");

  const { pokemons, loading } = usePokemonByType(selected);

  useEffect(() => {
    getAllTypes().then(setTypes);
  }, []);

  return (
    <div>
      <select
        className="border p-1 rounded mb-4"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Selecciona un tipo</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      {loading && <p>Cargando...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonFilter;
