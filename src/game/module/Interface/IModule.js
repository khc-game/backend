// libs
import crypto from "crypto";

// game
import TargetingCalculator from "../../targetingCalculator/TargetingCalculator.js";

// utils
import findCanUseCollision from "../../../utils/findCanUseCollision.js";

export default class IModule {
  constructor(title, cooldown = null) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.cooldown = cooldown;
    this.patterns = [];
    this.filters = [];
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
      this.useLogic(map, player, fromI, fromJ, toI, toJ, addChanges);
    });

    return changes;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges) {
    throw new Error("Must be implemented");
  }

  copy() {
    throw new Error("Must be implemented");
  }

  // if need do something
  afterMove(map, playerId, fromI, fromJ, changes) {}

  addPattern(pattern) {
    this.patterns.push(pattern);
    return this;
  }

  addFilters(filter) {
    this.filters.push(filter);
    return this;
  }
}
