import "./App.css";
import Board from "./components/Board";
import { useGameState } from "./hooks/useGameState";
import { useGameActions } from "./hooks/useGameActions";
import { GameModal } from "./components/GameModal";
import { PlayerInfo } from "./components/PlayerInfo";
import GameControls from "./components/GameControls";
import { GameTitle } from "./components/GameTitle";
import { BackgroundMusic } from "./components/BackgroundMusic";

function App() {
  const {
    gameState,
    updateGameState,
    updatePlayer,
    movePlayer,
    handleModal,
    switchPlayer,
  } = useGameState();

  const { rollDice, closeModal, getCurrentPlayer } = useGameActions({
    gameState,
    updateGameState,
    updatePlayer,
    movePlayer,
    handleModal,
    switchPlayer,
  });

  return (
    <div className="App">
      <BackgroundMusic />
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

      <Board
        players={gameState.players}
        currentPlayer={gameState.currentPlayer}
      />

      {gameState.modal.isOpen && (
        <GameModal
          type={gameState.modal.type}
          data={gameState.modal.data}
          currentPlayer={getCurrentPlayer().player}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
