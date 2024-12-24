import React from "react";
import "./Board.css";

const Board = ({ onEvent, players }) => {
  const tileTypes = [
    "start",
    "shop",
    "market",
    "event",
    "shop",
    "market",
    "event",
    "shop",
    "market",
    "event",
    "shop",
    "market",
    "event",
    "shop",
    "market",
    "event",
    "shop",
    "market",
    "event",
    "shop",
  ];

  const tileIcons = {
    start: "🏁",
    shop: "🏪",
    market: "💰",
    event: "❓",
  };

  const handleTileClick = (tileType) => {
    onEvent(tileType);
  };

  return (
    <div className="board">
      {tileTypes.map((tileType, idx) => (
        <div
          key={idx}
          className={`tile ${tileType}`}
          onClick={() => handleTileClick(tileType)}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>
            {tileIcons[tileType]}
          </div>
          <div style={{ marginBottom: "8px" }}>
            {tileType.charAt(0).toUpperCase() + tileType.slice(1)}
          </div>
          {players.map(
            (player) =>
              player.position === idx && (
                <div
                  key={player.id}
                  className="player-token"
                  style={{
                    backgroundColor: player.id === 1 ? "#FF6B6B" : "#4ECDC4",
                  }}
                >
                  Player {player.id}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
