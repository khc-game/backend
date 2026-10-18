// game
import Change from "../Change.js";

// module
import IShopItemModule from "./Interface/IShopItemModule.js";

// utils
import buildCharacterByKey from "../../utils/buildCharacterByKey.js";

export default class ShopItemCharacterModule extends IShopItemModule {
  constructor(title, cost, cooldown = null) {
    super(title, cost, IShopItemModule.types.player, cooldown);
  }

  whereCanUse(map, player, fromI, fromJ) {
    const dist = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],

      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    const whereCanUse = [];

    for (let i = 0; i < dist.length; ++i) {
      const [mx, my] = dist[i];

      const nx = fromI + mx;
      const ny = fromJ + my;

      const cell = map[nx]?.[ny];

      if (cell && cell?.character === null) {
        whereCanUse.push([nx, ny]);
      }
    }

    return whereCanUse;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const character = buildCharacterByKey(this.title, player);
    map[toI][toJ].character = character;
    addChanges(Change.spawnCharacter(toI, toJ, character));
  }

  copy() {
    const clone = new ShopItemCharacterModule(
      this.title,
      this.cost,
      this.cooldown,
    );
    clone.type = this.type;

    return clone;
  }
}
