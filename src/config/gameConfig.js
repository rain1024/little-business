export const BOARD_SIZE = 20;

export const INITIAL_PLAYER_STATE = {
  money: 1000,
  inventory: [],
  position: 0,
};

export const MOVE_DELAY = 500;
export const DICE_SIDES = 6;

export const TILE_TYPES = {
  SHOP: "SHOP",
  MARKET: "MARKET",
  EVENT: "EVENT",
  EMPTY: "EMPTY",
};

export const BOARD_LAYOUT = Array(BOARD_SIZE)
  .fill(null)
  .map((_, index) => {
    if (index === 0) return "START";
    const position = (index - 1) % 3; 
    if (position === 0) return TILE_TYPES.SHOP;
    if (position === 1) return TILE_TYPES.MARKET;
    return TILE_TYPES.EVENT;
  });
