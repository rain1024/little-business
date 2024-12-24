export function handleShopEvent(player) {
  console.log("handleShopEvent called with player:", player);
  const shopEvents = [
    {
      description: "Giảm giá lớn! Bạn mua được hàng với giá rẻ",
      goodsChange: 2,
      moneyChange: -50,
    },
    {
      description: "Hàng đắt đỏ hơn bình thường",
      goodsChange: -1,
      moneyChange: 100,
    },
    {
      description: "Bạn tìm thấy phiếu giảm giá",
      goodsChange: 1,
      moneyChange: -30,
    },
    {
      description: "Cửa hàng đang khuyến mãi",
      goodsChange: 3,
      moneyChange: -40,
    },
  ];

  const randomEvent = shopEvents[Math.floor(Math.random() * shopEvents.length)];
  player.goods += randomEvent.goodsChange;
  player.money += randomEvent.moneyChange;
  console.log(`Shop Event: ${randomEvent.description}`);
  return randomEvent;
}

export function handleMarketEvent(player) {
  const marketEvents = [
    {
      description: "Thị trường sôi động! Bán được giá cao",
      goodsChange: 0,
      moneyChange: 200,
    },
    {
      description: "Giá thị trường đang xuống",
      goodsChange: 0,
      moneyChange: -100,
    },
    {
      description: "Cơ hội tốt để trao đổi hàng",
      goodsChange: 3,
      moneyChange: -50,
    },
    { description: "Gặp khách hàng VIP", goodsChange: -2, moneyChange: 300 },
  ];

  const randomEvent =
    marketEvents[Math.floor(Math.random() * marketEvents.length)];
  player.goods += randomEvent.goodsChange;
  player.money += randomEvent.moneyChange;
  console.log(`Market Event: ${randomEvent.description}`);
  return randomEvent;
}
