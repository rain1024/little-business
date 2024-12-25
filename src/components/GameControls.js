import "./GameControls.css";

export function GameControls({
  isMoving,
  currentPlayer,
  currentDice,
  onRollDice,
}) {
  return (
    <div className="game-controls">
      <button
        className="roll-dice-button"
        onClick={onRollDice}
        disabled={isMoving}
      />
      <span className="player-turn">
        Current Player: {currentPlayer}
        {currentDice && ` (Rolled: ${currentDice})`}
      </span>
    </div>
  );
}
