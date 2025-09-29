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
    <div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          aria-label="Buscar Pokémon por nombre"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Buscar
        </button>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1 border rounded"
          >
            Limpiar
          </button>
        )}
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pokemon && <PokemonDetail pokemon={pokemon} />}
    </div>
  );
};

export default PokemonSearch;
