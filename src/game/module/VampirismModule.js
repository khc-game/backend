// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../targetingCalculator/TargetingCalculator.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class VampirismModule extends Module {
  constructor(blood, cooldown) {
    super("Vampirism", cooldown);
    this.blood = blood;
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
      const opponent = map[toI][toJ].character;
      const player = map[fromI][fromJ].character;

      const bloodForPlayer = Math.floor(
        (opponent.hp < this.blood ? opponent.hp : this.blood) / 2,
      );

      opponent.attacked(this.blood);
      player.heal(bloodForPlayer);

      addChanges(changeTypes.HEAL, [fromI, fromJ, bloodForPlayer]);
      addChanges(changeTypes.DAMAGE, [toI, toJ, this.blood]);
      if (opponent.hp <= 0) {
        addChanges(changeTypes.DEAD, [toI, toJ]);
      }
    });

    return changes;
  }

  copy() {
    const copy = new VampirismModule(this.blood, this.radius, this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
