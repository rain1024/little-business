import { useState } from "react";

const initialState = {
  currentPlayer: 1,
  players: [
    { id: 1, position: 0, money: 1000, inventory: [] },
    { id: 2, position: 0, money: 1000, inventory: [] },
  ],
  currentDice: null,
  isMoving: false,
  showModal: false,
  modalType: null,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(initialState);

  const updatePlayer = (playerIndex, updates) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player, idx) =>
        idx === playerIndex ? { ...player, ...updates } : player
      ),
    }));
  };

  const updateGameState = (updates) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  return { gameState, updatePlayer, updateGameState };
};
