import { useState } from "react";
import { usePokemons } from "../hook/usePokemons";
import PokemonCard from "./PokemonCard";

interface Props {
  limit?: number;
}

const PokemonList = ({ limit = 12 }: Props) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { pokemons, total, loading, error } = usePokemons(limit, offset);

  const totalPages = Math.ceil(total / limit);

  const nextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg animate-pulse">
          Cargando pokemons...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg font-semibold">⚠ Error: {error}</p>
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Grid de pokemons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((p) => (
          <div
            key={p.name}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <PokemonCard name={p.name} />
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
        >
          ◀ Anterior
        </button>

        <span className="text-gray-700 font-medium">
          Página <span className="font-bold">{page}</span> de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
