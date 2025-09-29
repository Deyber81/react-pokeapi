import { useState } from "react";
import { usePokemonDetails } from "../hook/usePokemonDetails";
import { motion } from "framer-motion";
import PokemonModal from "./PokemonModal";

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
  name: string;
}

const PokemonCard = ({ name }: Props) => {
  const { pokemon, loading } = usePokemonDetails(name);
  const [open, setOpen] = useState(false);

  if (loading)
    return (
      <div className="border p-4 rounded-xl shadow animate-pulse bg-gray-100 text-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );

  if (!pokemon) return null;

  const mainType = pokemon.types[0]?.type.name || "normal";
  const gradient = typeColors[mainType] || typeColors.normal;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`p-4 rounded-2xl shadow-lg text-center bg-gradient-to-b ${gradient} hover:shadow-xl transition-all duration-300 cursor-pointer`}
        onClick={() => setOpen(true)}
      >
        <motion.img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-28 h-28 drop-shadow-lg bg-white rounded-xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        />

        <h3 className="capitalize font-bold text-lg mt-2">{pokemon.name}</h3>

        <div className="flex justify-center gap-6 mt-3 text-sm">
          <p>
            <span className="font-semibold">Peso:</span> {pokemon.weight / 10}{" "}
            kg
          </p>
          <p>
            <span className="font-semibold">Altura:</span> {pokemon.height / 10}{" "}
            m
          </p>
        </div>
      </motion.div>

      <PokemonModal
        pokemon={pokemon}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default PokemonCard;
