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
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Game Name"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Backlog">Backlog</option>
        <option value="Playing">Playing</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleAdd}>Add Game</button>
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Backlog")}>Backlog</button>
      <button onClick={() => setFilter("Playing")}>Playing</button>
      <button onClick={() => setFilter("Completed")}>Completed</button>
      <ul>
        {visibleGames.map((game) => (
          <li key={game.name}>
            {game.name} - {game.status}
            <button onClick={() => handleDelete(game.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
