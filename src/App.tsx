import { useState } from "react";
import "./App.css";
import PokemonFilter from "./components/PokemonFilter";
import PokemonList from "./components/PokemonList";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const hasActiveFilter = Boolean(selectedType || searchTerm.trim());

  const clearAll = () => {
    setSelectedType("");
    setSearchTerm("");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>

      <PokemonSearch
        value={searchTerm}
        onInputChange={setSearchTerm}
        onSubmit={(q) => {
          if (q.trim()) setSelectedType("");
        }}
        onClear={() => setSearchTerm("")}
      />

      <PokemonFilter
        value={selectedType}
        onChange={(t) => {
          setSelectedType(t);
          if (t) setSearchTerm("");
        }}
      />

      {(selectedType || searchTerm) && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm">
            {selectedType
              ? `tipo = ${selectedType}`
              : `búsqueda = "${searchTerm}"`}
          </span>
          <button
            className="px-3 py-1 border rounded"
            onClick={clearAll}
            aria-label="Limpiar filtros"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {!hasActiveFilter && (
        <>
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Todos los Pokémon
          </h2>
          <PokemonList limit={12} />
        </>
      )}
    </div>
  );
}

export default App;
