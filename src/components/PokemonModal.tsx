import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import PokemonDetail from "./PokemonDetail";
import type { PokemonDetail as PokemonDetailType } from "../types/pokemon";
import { typeColors } from "../utils/typeColors";

interface Props {
  pokemon: PokemonDetailType | null;
  isOpen: boolean;
  onClose: () => void;
}

const PokemonModal = ({ pokemon, isOpen, onClose }: Props) => {
  if (!isOpen || !pokemon) return null;

  const mainType = pokemon.types[0]?.type.name || "normal";
  const gradient = typeColors[mainType] || typeColors.normal;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Contenedor del modal */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`relative rounded-2xl shadow-2xl w-[90%] max-w-md p-6 bg-gradient-to-b ${gradient}`}
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-red-400 text-lg font-bold"
            >
              ✕
            </button>

            {/* Detalle Pokémon */}
            <PokemonDetail pokemon={pokemon} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PokemonModal;
