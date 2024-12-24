export const shopItems = [
  { id: 1, name: "Sword", price: 100, type: "weapon" },
  { id: 2, name: "Shield", price: 80, type: "armor" },
  { id: 3, name: "Potion", price: 50, type: "consumable" },
  { id: 4, name: "Ring", price: 200, type: "accessory" },
  {
    id: 1,
    name: "Basic Goods",
    price: 50,
  },
];

export const marketPrices = {
  "Basic Goods": {
    sellPrice: 75,
    buyPrice: 50,
  },
  Sword: { buyPrice: 100, sellPrice: 70 },
  Shield: { buyPrice: 80, sellPrice: 55 },
  Potion: { buyPrice: 50, sellPrice: 35 },
  Ring: { buyPrice: 200, sellPrice: 140 },
};
