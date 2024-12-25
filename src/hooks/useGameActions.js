import { useCallback } from "react";
import { DICE_SIDES, BOARD_LAYOUT, TILE_TYPES } from "../config/gameConfig";
import {
  SHOP_EVENTS,
  MARKET_EVENTS,
  getRandomEvent,
} from "../events/gameEvents";

export function useGameActions({
  gameState,
  updateGameState,
  updatePlayer,
  movePlayer,
  handleModal,
  switchPlayer,
}) {
  const getCurrentPlayer = useCallback(() => {
    const playerIndex = gameState.currentPlayer - 1;
    return { player: gameState.players[playerIndex], index: playerIndex };
  }, [gameState.currentPlayer, gameState.players]);

  const handleTileEvent = useCallback(
    (playerIndex, tileType) => {
      const player = gameState.players[playerIndex];
      const eventMap = {
        [TILE_TYPES.SHOP]: {
          events: SHOP_EVENTS,
          type: "SHOP",
        },
        [TILE_TYPES.MARKET]: {
          events: MARKET_EVENTS,
          type: "MARKET",
        },
      };

      const tileConfig = eventMap[tileType];
      if (!tileConfig) {
        switchPlayer();
        return;
      }

      const event = getRandomEvent(tileConfig.events);
      const updates = event.effect(player);
      updatePlayer(playerIndex, updates);
      handleModal(tileConfig.type, { event, player });
    },
    [gameState.players, updatePlayer, handleModal, switchPlayer]
  );

  const rollDice = useCallback(() => {
    if (gameState.isMoving) return;

    const dice = Math.floor(Math.random() * DICE_SIDES) + 1;
    const { player, index } = getCurrentPlayer();
    const finalPosition = (player.position + dice) % BOARD_LAYOUT.length;

    updateGameState({ currentDice: dice, isMoving: true });

    // Create callback for handling tile event after movement
    const onMoveComplete = () => {
      const tileType = BOARD_LAYOUT[finalPosition];
      handleTileEvent(index, tileType);
    };

    movePlayer(index, player.position, dice, finalPosition, onMoveComplete);
  }, [
    gameState.isMoving,
    getCurrentPlayer,
    updateGameState,
    movePlayer,
    handleTileEvent,
  ]);

  const closeModal = useCallback(() => {
    handleModal();
    switchPlayer();
  }, [handleModal, switchPlayer]);

  return {
    rollDice,
    closeModal,
    getCurrentPlayer,
  };
}
