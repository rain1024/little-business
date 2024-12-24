export function GameControls({
  isMoving,
  currentPlayer,
  currentDice,
  onRollDice,
}) {
  return (
    <div className="game-controls">
      <button
        onClick={onRollDice}
        disabled={isMoving}
        className={`roll-button ${isMoving ? "disabled" : ""}`}
      >
        {isMoving ? "Moving..." : "Roll Dice"}
      </button>
      <span className="player-turn">
        Current Player: {currentPlayer}
        {currentDice && ` (Rolled: ${currentDice})`}
      </span>
    </div>
  );
}
