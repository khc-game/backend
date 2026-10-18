// game
import IModule from "./interface/IModule.js";
import Change from "../Change.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class AttackModule extends IModule {
  constructor(damage) {
    super("Attack");
    this.damage = damage;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    map[toI][toJ].character.damaged(this.damage);

    addChanges(Change.damage(toI, toJ, this.damage));

    if (map[toI][toJ].character.hp <= 0) {
      addChanges(Change.dead(toI, toJ, toJ));
    }
  }

  copy() {
    const copy = new AttackModule(this.damage, this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
