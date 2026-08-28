// game
import IModule from "./interface/IModule.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class TeleportModule extends IModule {
  constructor(cooldown) {
    super("Teleport", cooldown);
  }

  whereCanUse(map, player, fromI, fromJ) {
    const whereCanUse = [];

    for (let i = 0; i < map.length; ++i) {
      for (let j = 0; j < map[i].length; ++j) {
        const cell = map[i][j];
        if (!cell.character) {
          whereCanUse.push([i, j]);
        }
      }
    }

    return whereCanUse;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const cellData = map[fromI][fromJ].character;
    map[fromI][fromJ].character = null;
    map[toI][toJ].character = cellData;

    addChanges(changeTypes.MOVE, [fromI, fromJ, toI, toJ]);
  }

  copy() {
    return new TeleportModule(this.cooldown);
  }
}
