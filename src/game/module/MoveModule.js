// game
import Module from "./Module.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCaUseCollision from "../../utils/findCanUseCollision.js";

export default class MoveModule extends Module {
  radius = null;

  constructor(radius) {
    super("Move");
    this.radius = radius;
  }

  whereCanUse(map, i, j) {
    return getByRadius(map, i, j, this.radius);
  }

  use(map, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, fromI, fromJ);
    
    const changes = findCaUseCollision(canUseAt, toI, toJ, (addChanges) => {
      const cellData = map[fromI][fromJ].content;
      map[fromI][fromJ].content = null;
      map[toI][toJ].content = cellData;

      addChanges(fromI, fromJ, map[fromI][fromJ]);
      addChanges(toI, toJ, map[toI][toJ]);
    });

    return changes;
  }
}
