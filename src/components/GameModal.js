import React from "react";

export const GameModal = ({ type, data, currentPlayer, onClose }) => {
  const renderContent = () => {
    if (!data || !data.event) return null;

    return (
      <div className="modal-content">
        <h2>{type}</h2>
        <p className="event-description">{data.event.description}</p>

        <div className="player-status">
          <p>Current Money: ${currentPlayer.money}</p>
          <p>Inventory Items: {currentPlayer.inventory.length}</p>
        </div>

        <button className="close-button" onClick={onClose}>
          Continue
        </button>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">{renderContent()}</div>
    </div>
  );
};
