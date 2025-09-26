import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <div className="flex gap-6">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="w-16 hover:rotate-180 transition"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="w-16 animate-bounce"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold mt-6 text-blue-600">
        Vite + React + Tailwind
      </h1>
      <div className="card mt-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          count is {count}
        </button>
        <p className="mt-2 text-gray-600">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
