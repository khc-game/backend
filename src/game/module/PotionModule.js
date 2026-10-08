// game
import IModule from "./interface/IModule.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class PotionModule extends IModule {
  constructor(heal, cooldown) {
    super("Potion", cooldown);
    this.heal = heal;
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
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
