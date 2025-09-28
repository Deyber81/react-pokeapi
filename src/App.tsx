import "./App.css";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Todos los Pokémon</h2>
      <PokemonList limit={12} offset={0} />
    </div>
  );
}

export default App;
