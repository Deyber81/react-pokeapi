import { useState } from "react";
import { useSearchPokemon } from "../hook/useSearchPokemon";
import PokemonDetail from "./PokemonDetail";

const PokemonSearch = () => {
  const [query, setQuery] = useState("");
  const { pokemon, loading, error, search } = useSearchPokemon();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) search(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Buscar
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pokemon && <PokemonDetail pokemon={pokemon} />}
    </div>
  );
};

export default PokemonSearch;
