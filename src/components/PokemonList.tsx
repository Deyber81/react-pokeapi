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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Grid de pokemons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          ◀ Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
