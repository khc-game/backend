// game
import Module from "./Module.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

export default class TeleportModule extends Module {
  constructor(cooldown) {
    super("Teleport", cooldown);
  }

  whereCanUse(map, player, fromI, fromJ) {
    const whereCanUse = [];

    for (let i = 0; i < map.length; ++i) {
      for (let j = 0; j < map[i].length; ++j) {
        const cell = map[i][j];
        if (!cell.content) {
          whereCanUse.push([i, j]);
        }
      }
    }

    return whereCanUse;
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);
    
    const changes = findCanUseCollision(canUseAt, toI, toJ, (addChanges) => {
      const cellData = map[fromI][fromJ].content;
      map[fromI][fromJ].content = null;
      map[toI][toJ].content = cellData;

      addChanges(toI, toJ, map[toI][toJ]);
      addChanges(fromI, fromJ, map[fromI][fromJ]);
    });

    return changes;
  }
}