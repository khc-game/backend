// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../TargetingCalculator.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class VampirismModule extends Module {
  constructor(blood, cooldown) {
    super("Vampirism", cooldown);
    this.blood = blood;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const opponent = map[toI][toJ].character;
    const character = map[fromI][fromJ].character;

    const bloodForPlayer = Math.floor(
      (opponent.hp < this.blood ? opponent.hp : this.blood) / 2,
    );

    opponent.attacked(this.blood);
    character.heal(bloodForPlayer);

    addChanges(changeTypes.HEAL, [fromI, fromJ, bloodForPlayer]);
    addChanges(changeTypes.DAMAGE, [toI, toJ, this.blood]);
    if (opponent.hp <= 0) {
      addChanges(changeTypes.DEAD, [toI, toJ]);
    }
  }

  copy() {
    const copy = new VampirismModule(this.blood, this.radius, this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
