// game
import Module from "./Module.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

export default class MoveModule extends Module {
  radius = null;

  constructor(radius) {
    super("Move");
    this.radius = radius;
  }

  whereCanUse(map, player, fromI, fromJ) {
    return getByRadius(map, fromI, fromJ, this.radius);
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);

    const changes = findCanUseCollision(canUseAt, toI, toJ, (addChanges) => {
      const cellData = map[fromI][fromJ].character;
      map[fromI][fromJ].character = null;
      map[toI][toJ].character = cellData;

      addChanges(fromI, fromJ, map[fromI][fromJ]);
      addChanges(toI, toJ, map[toI][toJ]);
    });

    return changes;
  }

  copy() {
    return new MoveModule(this.radius);
  }
}
