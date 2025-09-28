import { usePokemonDetails } from "../hook/usePokemonDetails";

interface Props {
  name: string;
}

const PokemonCard = ({ name }: Props) => {
  const { pokemon, loading } = usePokemonDetails(name);

  if (loading) return <div className="border p-2 rounded">Cargando...</div>;
  if (!pokemon) return null;

  return (
    <div className="border p-2 rounded shadow text-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto"
      />
      <h3 className="capitalize font-bold">{pokemon.name}</h3>
      <p>Peso: {pokemon.weight}</p>
    </div>
  );
};

export default PokemonCard;
