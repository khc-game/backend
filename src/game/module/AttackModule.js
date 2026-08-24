// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../TargetingCalculator.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class AttackModule extends Module {
  constructor(damage) {
    super("Attack");
    this.damage = damage;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const cellData = map[fromI][fromJ].character;
    map[toI][toJ].character.attacked(this.damage);

    addChanges(changeTypes.DAMAGE, [toI, toJ, this.damage]);
    if (map[toI][toJ].character.hp <= 0) {
      addChanges(changeTypes.DEAD, [toI, toJ]);
    }
  }

  copy() {
    const copy = new AttackModule(this.damage, this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
