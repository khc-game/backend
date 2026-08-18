// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../TargetingCalculator.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class PotionModule extends Module {
  constructor(heal, cooldown) {
    super("Potion", cooldown);
    this.heal = heal;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges) {
    const currentHp = map[toI][toJ].character.hp;
    map[toI][toJ].character.heal(this.heal);
    const updateHp = map[toI][toJ].character.hp;
    addChanges(changeTypes.HEAL, [toI, toJ, updateHp - currentHp]);
  }

  copy() {
    const copy = new PotionModule(this.heal, this.radius, this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
