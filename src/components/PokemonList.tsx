import { usePokemons } from "../hook/usePokemons";
import PokemonCard from "./PokemonCard";

interface Props {
  limit?: number;
  offset?: number;
}

const PokemonList = ({ limit = 20, offset = 0 }: Props) => {
  const { pokemons, loading, error } = usePokemons(limit, offset);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <PokemonCard key={p.name} name={p.name} />
      ))}
    </div>
  );
};

export default PokemonList;
