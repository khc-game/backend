// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../targetingCalculator/TargetingCalculator.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class AttackModule extends Module {
  constructor(damage) {
    super("Attack");
    this.damage = damage;
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
      const cellData = map[fromI][fromJ].character;
      map[toI][toJ].character.attacked(this.damage);

      addChanges(changeTypes.DAMAGE, [toI, toJ, this.damage]);
      if (map[toI][toJ].character.hp <= 0) {
        addChanges(changeTypes.DEAD, [toI, toJ]);
      }
    });

    return changes;
  }

  copy() {
    const copy = new AttackModule(this.damage, this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
