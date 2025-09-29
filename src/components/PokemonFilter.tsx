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
    <div>
      <select
        className="border p-1 rounded mb-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filtrar por tipo"
      >
        <option value="">Selecciona un tipo</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      {loading && value && <p>Cargando...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {value && (
        <>
          {total > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Anterior
                </button>
                <span className="text-sm">
                  Página {page} de {totalPages} · {total} resultados
                </span>
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Siguiente →
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageItems.map((p: Pokemon) => (
                  <PokemonCard key={p.name} name={p.name} />
                ))}
              </div>
            </>
          ) : (
            !loading && <p>No hay resultados para este tipo.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonFilter;
