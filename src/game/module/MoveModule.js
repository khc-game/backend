// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../targetingCalculator/TargetingCalculator.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class MoveModule extends Module {
  constructor() {
    super("Move");
  }

  whereCanUse(map, player, fromI, fromJ) {
    return new TargetingCalculator(
      map,
      fromI,
      fromJ,
      this.patterns,
      this.filters,
    );
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
    const copy = new MoveModule(this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
