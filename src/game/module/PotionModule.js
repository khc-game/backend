// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../targetingCalculator/TargetingCalculator.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class PotionModule extends Module {
  constructor(heal, cooldown) {
    super("Potion", cooldown);
    this.heal = heal;
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
      const currentHp = map[toI][toJ].character.hp;
      map[toI][toJ].character.heal(this.heal);
      const updateHp = map[toI][toJ].character.hp;
      addChanges(changeTypes.HEAL, [toI, toJ, updateHp - currentHp]);
    });

    return changes;
  }

  copy() {
    const copy = new PotionModule(this.heal, this.radius, this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
