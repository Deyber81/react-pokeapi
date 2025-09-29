import { useEffect, useMemo, useState } from "react";
import { getAllTypes } from "../services/pokemonService";
import { usePokemonByType } from "../hook/usePokemonByType";
import PokemonCard from "./PokemonCard";
import type { Pokemon, PokemonType } from "../types/pokemon";

const PAGE_SIZE = 12;

type Props = {
  value: string;
  onChange: (type: string) => void;
};

const PokemonFilter = ({ value, onChange }: Props) => {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [page, setPage] = useState(1);

  const { pokemons: all, loading, error } = usePokemonByType(value);

  useEffect(() => {
    getAllTypes().then(setTypes).catch(console.error);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [value]);

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  }, [all, page]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Select estilizado */}
      <div className="flex justify-center mb-6">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filtrar por tipo"
        >
          <option value="">Selecciona un tipo</option>
          {types.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Estados de carga y error */}
      {loading && value && (
        <p className="text-center text-gray-600 animate-pulse">
          Cargando pokemons...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">
          ⚠ Error: {error}
        </p>
      )}

      {/* Resultados */}
      {value && (
        <>
          {total > 0 ? (
            <>
              {/* Paginación */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 
                             disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Anterior
                </button>

                <span className="text-gray-700 text-sm font-medium">
                  Página <span className="font-bold">{page}</span> de{" "}
                  {totalPages} · {total} resultados
                </span>

                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 
                             disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Siguiente →
                </button>
              </div>

              {/* Grid de pokemons */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pageItems.map((p: Pokemon) => (
                  <div
                    key={p.name}
                    className="bg-white shadow-md rounded-2xl p-4 
                               hover:shadow-xl hover:-translate-y-1 transition duration-300"
                  >
                    <PokemonCard name={p.name} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            !loading && (
              <p className="text-center text-gray-500">
                No hay resultados para este tipo.
              </p>
            )
          )}
        </>
      )}
    </div>
  );
};

export default PokemonFilter;
