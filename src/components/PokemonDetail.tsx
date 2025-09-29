import type { PokemonDetail as PokemonDetailType } from "../types/pokemon";
import { motion } from "framer-motion";

const typeColors: Record<string, string> = {
  normal: "from-gray-100 to-gray-300 text-gray-800",
  fire: "from-orange-400 to-red-500 text-white",
  water: "from-blue-400 to-blue-600 text-white",
  grass: "from-green-400 to-green-600 text-white",
  electric: "from-yellow-300 to-yellow-500 text-gray-900",
  ice: "from-cyan-300 to-cyan-500 text-white",
  fighting: "from-red-600 to-red-800 text-white",
  poison: "from-purple-500 to-purple-700 text-white",
  ground: "from-yellow-600 to-yellow-800 text-white",
  flying: "from-indigo-300 to-indigo-500 text-white",
  psychic: "from-pink-400 to-pink-600 text-white",
  bug: "from-lime-400 to-lime-600 text-gray-900",
  rock: "from-yellow-700 to-yellow-900 text-white",
  ghost: "from-purple-600 to-purple-900 text-white",
  dragon: "from-indigo-600 to-purple-800 text-white",
  dark: "from-gray-700 to-gray-900 text-white",
  steel: "from-gray-400 to-gray-600 text-gray-900",
  fairy: "from-pink-300 to-pink-500 text-gray-900",
};

interface Props {
  pokemon: PokemonDetailType;
}

const PokemonDetail = ({ pokemon }: Props) => {
  const mainType = pokemon.types[0]?.type.name || "normal";
  const gradient = typeColors[mainType] || typeColors.normal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 rounded-2xl shadow-xl max-w-md mx-auto bg-gradient-to-b ${gradient}`}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold capitalize text-center mb-6"
      >
        {pokemon.name}
      </motion.h2>

      <motion.div
        className="bg-white rounded-xl p-4 flex items-center justify-center mb-6 shadow-inner"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 drop-shadow-lg"
        />
      </motion.div>

      <div className="flex justify-around mb-6">
        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
          <strong className="block">Altura</strong>
          {pokemon.height / 10} m
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
          <strong className="block">Peso</strong>
          {pokemon.weight / 10} kg
        </motion.div>
      </div>

      <div className="mb-6">
        <strong>Tipos:</strong>
        <div className="flex gap-3 mt-2 flex-wrap">
          {pokemon.types.map((t, idx) => (
            <motion.span
              key={t.type.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md capitalize shadow"
            >
              {t.type.name}
            </motion.span>
          ))}
        </div>
      </div>

      <div>
        <strong>Habilidades:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {pokemon.abilities.map((a, idx) => (
            <motion.li
              key={a.ability.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`capitalize ${
                a.is_hidden ? "italic opacity-75" : "font-medium"
              }`}
            >
              {a.ability.name} {a.is_hidden && "(oculta)"}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PokemonDetail;
