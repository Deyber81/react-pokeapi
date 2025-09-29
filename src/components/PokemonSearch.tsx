import { useEffect } from "react";
import { useSearchPokemon } from "../hook/useSearchPokemon";
import PokemonDetail from "./PokemonDetail";

type Props = {
  value: string;
  onInputChange: (q: string) => void;
  onSubmit?: (q: string) => void;
  onClear?: () => void;
};

const PokemonSearch = ({ value, onInputChange, onSubmit, onClear }: Props) => {
  const { pokemon, loading, error, search, clear } = useSearchPokemon();

  useEffect(() => {
    if (!value) clear();
  }, [value, clear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSubmit?.(q);
    search(q);
  };

  const handleClear = () => {
    onInputChange("");
    onClear?.();
    clear();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          placeholder="🔍 Buscar Pokémon..."
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          aria-label="Buscar Pokémon por nombre"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold 
                     hover:bg-blue-600 transition disabled:opacity-50"
          disabled={!value.trim()}
        >
          Buscar
        </button>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 
                       hover:bg-gray-100 transition"
          >
            Limpiar
          </button>
        )}
      </form>

      {/* Estados */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Cargando resultados...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">⚠ {error}</p>
      )}
      {pokemon && (
        <div className="mt-6">
          <PokemonDetail pokemon={pokemon} />
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
