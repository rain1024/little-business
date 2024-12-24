import "./App.css";
import Board from "./components/Board";
import { useGameState } from "./hooks/useGameState";
import { useGameActions } from "./hooks/useGameActions";
import { GameModal } from "./components/GameModal";
import { PlayerInfo } from "./components/PlayerInfo";
import { GameControls } from "./components/GameControls";
import { GameTitle } from "./components/GameTitle";

function App() {
  const { gameState } = useGameState();
  const { rollDice, handleBuyItem, handleSellItem, closeModal } =
    useGameActions();

  return (
    <div className="App">
      <GameTitle title="Tiểu Thương Nhỏ" />

      <div className="game-info">
        <PlayerInfo playerNumber={1} player={gameState.players[0]} />
        <PlayerInfo playerNumber={2} player={gameState.players[1]} />
      </div>

      <GameControls
        isMoving={gameState.isMoving}
        currentPlayer={gameState.currentPlayer}
        currentDice={gameState.currentDice}
        onRollDice={rollDice}
      />

      <Board players={gameState.players} />

      {gameState.showModal && (
        <GameModal
          gameState={gameState}
          onBuyItem={handleBuyItem}
          onSellItem={handleSellItem}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
