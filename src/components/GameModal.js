import React from "react";
import { shopItems, marketPrices } from "../data/items";

export const GameModal = ({ gameState, onBuyItem, onSellItem, onClose }) => {
  const currentPlayer = gameState.players[gameState.currentPlayer - 1];

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{gameState.modalType === "shop" ? "Shop" : "Market"}</h2>
        {gameState.modalType === "shop" ? (
          <div className="shop-items">
            {shopItems.map((item) => (
              <div key={item.id} className="shop-item">
                <span>
                  {item.name} - ${item.price}
                </span>
                <button onClick={() => onBuyItem(item)}>Buy</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="market-items">
            {currentPlayer.inventory.map((item, index) => {
              const marketPrice = marketPrices[item.name];
              if (!marketPrice) return null;

              return (
                <div key={index} className="market-item">
                  <span>
                    {item.name} - Sell for ${marketPrice.sellPrice}
                  </span>
                  <button onClick={() => onSellItem(item)}>Sell</button>
                </div>
              );
            })}
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
