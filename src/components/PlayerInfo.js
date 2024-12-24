export function PlayerInfo({ playerNumber, player }) {
  return (
    <div className="player-info">
      <h2>
        Player {playerNumber}: ${player.money}
      </h2>
      <p>Inventory: {player.inventory.length} goods</p>
      <p>Position: {player.position + 1}</p>
    </div>
  );
}
