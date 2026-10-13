// libs
import crypto from "crypto";

// game
import TargetingCalculator from "../../TargetingCalculator.js";

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
      player,
      fromI,
      fromJ,
      this.patterns,
      this.filters,
    );
  }

  use(map, player, fromI, fromJ, toI, toJ, isFirstPlayer) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);

    const changes = findCanUseCollision(canUseAt, toI, toJ, (addChanges) => {
      this.useLogic(
        map,
        player,
        fromI,
        fromJ,
        toI,
        toJ,
        addChanges,
        isFirstPlayer,
      );
    });

    return changes;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    throw new Error("Must be implemented");
  }

  copy() {
    throw new Error("Must be implemented");
  }

  // if need do something
  afterMove(map, playerId, fromI, fromJ, changes, charI, charJ) {}

  addPattern(...patterns) {
    this.patterns = [...this.patterns, ...patterns];
    return this;
  }

  addFilter(...filters) {
    this.filters = [...this.filters, ...filters];
    return this;
  }
}
