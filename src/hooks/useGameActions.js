export function useGameActions(gameState, updateGameState, updatePlayer) {
  const rollDice = () => {
    if (gameState.isMoving) return;

    const dice = Math.floor(Math.random() * 6) + 1;
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const currentPosition = gameState.players[currentPlayerIndex].position;
    const finalPosition = (currentPosition + dice) % 20;

    updateGameState({ currentDice: dice, isMoving: true });
    movePlayer(currentPlayerIndex, currentPosition, dice, finalPosition);
  };

  const movePlayer = (playerIndex, startPos, steps, finalPos) => {
    let currentStep = 0;
    const moveInterval = setInterval(() => {
      if (currentStep < steps) {
        const newPosition = (startPos + currentStep + 1) % 20;
        updatePlayer(playerIndex, { position: newPosition });
        currentStep++;
      } else {
        clearInterval(moveInterval);
        handleMovementComplete(playerIndex, finalPos);
      }
    }, 500);
  };

  const handleMovementComplete = (playerIndex, finalPosition) => {
    updateGameState({
      isMoving: false,
      currentPlayer: gameState.currentPlayer === 1 ? 2 : 1,
      showModal: true,
    });
  };

  const handleBuyItem = (item) => {
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const player = gameState.players[currentPlayerIndex];

    if (player.money >= item.price) {
      updatePlayer(currentPlayerIndex, {
        money: player.money - item.price,
        inventory: [...player.inventory, item],
      });
    }
    closeModal();
  };

  const handleSellItem = (itemIndex) => {
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const player = gameState.players[currentPlayerIndex];
    const item = player.inventory[itemIndex];

    const newInventory = [...player.inventory];
    newInventory.splice(itemIndex, 1);

    updatePlayer(currentPlayerIndex, {
      money: player.money + item.price,
      inventory: newInventory,
    });
    closeModal();
  };

  const closeModal = () => {
    updateGameState({ showModal: false });
  };

  return {
    rollDice,
    handleBuyItem,
    handleSellItem,
    closeModal,
  };
}
