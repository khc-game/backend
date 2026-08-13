// game
import Module from "./interface/Module.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

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
      const character = map[fromI][fromJ].character;
      map[fromI][fromJ].character = null;
      map[toI][toJ].character = character;

      addChanges(changeTypes.MOVE, [fromI, fromJ, toI, toJ]);
    });

    return changes;
  }

  copy() {
    return new MoveModule(this.radius);
  }
}
