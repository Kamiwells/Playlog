import { useState, useEffect } from "react";
function App() {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem("games");
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Backlog");
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);
  function handleAdd() {
    if (name.trim() === "") return;
    setGames([...games, { name: name, status: status }]);
    setName("");
  }
  function handleDelete(gameName) {
    setGames(games.filter((game) => game.name !== gameName));
  }
  const visibleGames =
    filter === "All" ? games : games.filter((game) => game.status === filter);
  return (
    <div className="max-w-xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold text-center mb-6">PlayLog</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Game Name"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Playing">Playing</option>
          <option value="Completed">Completed</option>
          <option value="Abandoned">Abandoned</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add Game
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => setFilter("Playing")}
        >
          Playing
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => setFilter("Abandoned")}
        >
          Abandoned
        </button>
      </div>
      <ul className="space-y-2">
        {visibleGames.map((game) => (
          <li
            key={game.name}
            className="flex justify-between items-center px-4 py-2 rounded border border-gray-300 hover:bg-gray-800 transition duration-200"
          >
            {game.name} - {game.status}
            <button
              onClick={() => handleDelete(game.name)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
