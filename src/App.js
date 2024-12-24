import "./App.css";
import Board from "./components/Board";
import React, { useState } from "react";

function App() {
  const [gameState, setGameState] = useState({
    currentPlayer: 1,
    players: [
      { id: 1, position: 0, money: 1000, inventory: [] },
      { id: 2, position: 0, money: 1000, inventory: [] },
    ],
    currentDice: null,
    isMoving: false,
  });

  const rollDice = () => {
    if (gameState.isMoving) return;

    const dice = Math.floor(Math.random() * 6) + 1;
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const currentPosition = gameState.players[currentPlayerIndex].position;

    setGameState((prev) => ({ ...prev, currentDice: dice, isMoving: true }));

    let step = 0;
    const moveInterval = setInterval(() => {
      if (step < dice) {
        step++;
        const newPosition = (currentPosition + step) % 20;

        const newPlayers = [...gameState.players];
        newPlayers[currentPlayerIndex] = {
          ...newPlayers[currentPlayerIndex],
          position: newPosition,
        };

        setGameState((prev) => ({ ...prev, players: newPlayers }));
      } else {
        clearInterval(moveInterval);
        setGameState((prev) => ({
          ...prev,
          isMoving: false,
          currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
        }));
      }
    }, 500);
  };

  const handleEvent = (tileType) => {
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const player = gameState.players[currentPlayerIndex];

    switch (tileType) {
      case "shop":
        if (player.money >= 200) {
          const newPlayers = [...gameState.players];
          newPlayers[currentPlayerIndex] = {
            ...player,
            money: player.money - 200,
            inventory: [...player.inventory, "goods"],
          };
          setGameState({ ...gameState, players: newPlayers });
          console.log(`Player ${gameState.currentPlayer} bought goods for 200`);
        }
        break;
      case "market":
        if (player.inventory.includes("goods")) {
          const newPlayers = [...gameState.players];
          const goodsIndex = player.inventory.indexOf("goods");
          const newInventory = [...player.inventory];
          newInventory.splice(goodsIndex, 1);
          newPlayers[currentPlayerIndex] = {
            ...player,
            money: player.money + 300,
            inventory: newInventory,
          };
          setGameState({ ...gameState, players: newPlayers });
          console.log(`Player ${gameState.currentPlayer} sold goods for 300`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1
        style={{
          color: "#4CAF50",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        Tiểu Thương Nhỏ
      </h1>

      <div className="game-info" style={{ marginBottom: "2rem" }}>
        <div className="player-info">
          <h2>Player 1: ${gameState.players[0].money}</h2>
          <p>Inventory: {gameState.players[0].inventory.length} goods</p>
          <p>Position: {gameState.players[0].position + 1}</p>
        </div>
        <div className="player-info">
          <h2>Player 2: ${gameState.players[1].money}</h2>
          <p>Inventory: {gameState.players[1].inventory.length} goods</p>
          <p>Position: {gameState.players[1].position + 1}</p>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={rollDice}
          disabled={gameState.isMoving}
          style={{
            padding: "10px 20px",
            fontSize: "1.1rem",
            backgroundColor: gameState.isMoving ? "#cccccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: gameState.isMoving ? "not-allowed" : "pointer",
            marginRight: "1rem",
          }}
        >
          {gameState.isMoving ? "Moving..." : "Roll Dice"}
        </button>
        <span style={{ fontSize: "1.2rem" }}>
          Current Player: {gameState.currentPlayer}
          {gameState.currentDice && ` (Rolled: ${gameState.currentDice})`}
        </span>
      </div>

      <Board onEvent={handleEvent} players={gameState.players} />
    </div>
  );
}

export default App;
