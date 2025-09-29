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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-sm">
          Pokédex
        </h1>

        {/* Buscador */}
        <PokemonSearch
          value={searchTerm}
          onInputChange={setSearchTerm}
          onSubmit={(q) => {
            if (q.trim()) setSelectedType("");
          }}
          onClear={() => setSearchTerm("")}
        />

        {/* Filtro por tipo */}
        <div className="mt-6">
          <PokemonFilter
            value={selectedType}
            onChange={(t) => {
              setSelectedType(t);
              if (t) setSearchTerm("");
            }}
          />
        </div>

        {/* Filtros activos */}
        {(selectedType || searchTerm) && (
          <div className="flex items-center justify-between bg-white shadow rounded-lg p-3 mt-6">
            <span className="text-sm text-gray-700">
              {selectedType
                ? `🔖 Tipo = ${selectedType}`
                : `🔍 Búsqueda = "${searchTerm}"`}
            </span>
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              onClick={clearAll}
              aria-label="Limpiar filtros"
            >
              ✕ Limpiar filtros
            </button>
          </div>
        )}

        {/* Lista general */}
        {!hasActiveFilter && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              📋 Todos los Pokémon
            </h2>
            <PokemonList limit={12} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
