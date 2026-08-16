// libs
import crypto from "crypto";

export default class IModule {
  constructor(title, cooldown = null) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.cooldown = cooldown;
  }

  whereCanUse(map, player, fromI, fromJ) {
    throw new Error("Must be implemented");
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    throw new Error("Must be implemented");
  }

  copy() {
    throw new Error("Must be implemented");
  }

  // if need do something
  afterMove(map, playerId, fromI, fromJ, changes) {}
}
