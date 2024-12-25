import { useState, useCallback } from "react";
import { INITIAL_PLAYER_STATE, BOARD_SIZE } from "../config/gameConfig";

const createInitialState = () => ({
  currentPlayer: 1,
  players: [
    { id: 1, ...INITIAL_PLAYER_STATE },
    { id: 2, ...INITIAL_PLAYER_STATE },
  ],
  currentDice: null,
  isMoving: false,
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
});

export const useGameState = () => {
  const [gameState, setGameState] = useState(createInitialState());

  const updatePlayer = useCallback((playerIndex, updates) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player, idx) =>
        idx === playerIndex ? { ...player, ...updates } : player
      ),
    }));
  }, []);

  const updateGameState = useCallback((updates) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  }, []);

  const movePlayer = useCallback(
    (playerIndex, startPosition, steps, finalPosition, onComplete) => {
      let currentPosition = startPosition;
      const moveInterval = setInterval(() => {
        if (currentPosition === finalPosition) {
          clearInterval(moveInterval);
          updateGameState({ isMoving: false });
          if (onComplete) onComplete();
          return;
        }
        currentPosition = (currentPosition + 1) % BOARD_SIZE;
        updatePlayer(playerIndex, { position: currentPosition });
      }, 300);
    },
    [updatePlayer, updateGameState]
  );

  const handleModal = useCallback((type = null, data = null) => {
    setGameState((prev) => ({
      ...prev,
      modal: {
        isOpen: type !== null,
        type,
        data,
      },
    }));
  }, []);

  const switchPlayer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
      currentDice: null,
    }));
  }, []);

  return {
    gameState,
    updatePlayer,
    updateGameState,
    movePlayer,
    handleModal,
    switchPlayer,
  };
};
