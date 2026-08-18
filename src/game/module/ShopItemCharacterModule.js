// character
import Character from "../character/Character.js";

// module
import IShopItemModule from "./Interface/IShopItemModule.js";

// utils
import findCaUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";
import { characters } from "../../config/characters.js";

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

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges) {
    const character = new Character(this.title, player);
    map[toI][toJ].character = character;
    addChanges(changeTypes.SPAWN_CHARACTER, [toI, toJ, character]);
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
