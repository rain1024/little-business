export function showEventNotification(event) {
  const notification = document.createElement("div");
  notification.className = "event-notification";
  notification.textContent = event.description;

  const changes = document.createElement("p");
  changes.textContent = `Hàng hóa: ${event.goodsChange > 0 ? "+" : ""}${
    event.goodsChange
  } | Tiền: ${event.moneyChange > 0 ? "+" : ""}${event.moneyChange}`;
  notification.appendChild(changes);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
