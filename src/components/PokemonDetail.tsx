import type { PokemonDetail as PokemonDetailType } from "../types/pokemon";

interface Props {
  pokemon: PokemonDetailType;
}

const PokemonDetail = ({ pokemon }: Props) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg max-w-sm mx-auto bg-white">
      <h2 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-32 h-32 mb-4"
      />

      <div className="flex justify-around mb-4">
        <div>
          <strong>Altura:</strong> {pokemon.height} m
        </div>
        <div>
          <strong>Peso:</strong> {pokemon.weight} kg
        </div>
      </div>

      <div className="mb-4">
        <strong>Tipos:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </div>

      <div>
        <strong>Habilidades:</strong>
        <ul className="list-disc list-inside mt-2">
          {pokemon.abilities.map((a) => (
            <li key={a.ability.name} className={a.is_hidden ? "italic" : ""}>
              {a.ability.name} {a.is_hidden && "(oculta)"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
