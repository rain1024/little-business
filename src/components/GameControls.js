import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Dice } from "./Dice";
import { CameraControls } from "./CameraControls";
import "./GameControls.css";

const GameControls = ({ isMoving, currentPlayer, currentDice, onRollDice }) => {
  const [isRolling, setIsRolling] = useState(false);
  const diceSound = new Audio("./audio/dice-roll.mp3");
  const hoverSound = new Audio("./audio/hover.mp3");
  hoverSound.volume = 0.3;

  const playDiceSound = () => {
    diceSound.currentTime = 0;
    diceSound.play().catch((error) => console.log("Audio play failed:", error));
  };

  const playHoverSound = () => {
    hoverSound.currentTime = 0;
    hoverSound
      .play()
      .catch((error) => console.log("Audio play failed:", error));
  };

  const handleRollDice = () => {
    setIsRolling(true);
    playDiceSound();
    onRollDice();
  };

  useEffect(() => {
    if (isRolling) {
      const timer = setTimeout(() => setIsRolling(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isRolling]);

  return (
    <div className="game-controls">
      <button
        className="roll-dice-button"
        onClick={handleRollDice}
        onMouseEnter={playHoverSound}
        disabled={isMoving}
      />

      <div className="dice-canvas">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Dice number={currentDice || 1} rolling={isRolling} />
          <CameraControls />
        </Canvas>
      </div>

      <span className="player-turn">
        Current Player: {currentPlayer}
        {currentDice && ` (Rolled: ${currentDice})`}
      </span>
    </div>
  );
};

export default GameControls;
