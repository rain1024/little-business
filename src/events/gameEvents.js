export const SHOP_EVENTS = [
  {
    id: "shop_1",
    description: "Giảm giá lớn! Bạn mua được hàng với giá rẻ",
    effect: (player) => ({
      money: player.money - 50,
      inventory: [
        ...player.inventory,
        { id: "discount_item", name: "Discounted Goods", price: 50 },
      ],
    }),
  },
  {
    id: "shop_2",
    description: "Cửa hàng đang khuyến mãi",
    effect: (player) => ({
      money: player.money - 40,
      inventory: [
        ...player.inventory,
        { id: "promo_item", name: "Promotional Goods", price: 40 },
      ],
    }),
  },
];

export const MARKET_EVENTS = [
  {
    id: "market_1",
    description: "Thị trường sôi động! Bán được giá cao",
    effect: (player) => ({
      money: player.money + 200,
      inventory: player.inventory.slice(1), // Remove one item
    }),
  },
  {
    id: "market_2",
    description: "Gặp khách hàng VIP",
    effect: (player) => ({
      money: player.money + 300,
      inventory: player.inventory.slice(2), // Remove two items
    }),
  },
];

export const getRandomEvent = (events) => {
  return events[Math.floor(Math.random() * events.length)];
};
