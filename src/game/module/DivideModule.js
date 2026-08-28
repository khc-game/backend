// game
import IModule from "./interface/IModule.js";
import TargetingCalculator from "../TargetingCalculator.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class DivideModule extends IModule {
  constructor(cooldown) {
    super("Divide", cooldown);
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const originalCharacter = map[fromI][fromJ].character;
    const clonedCharacter = originalCharacter.clone();

    clonedCharacter.hp = originalCharacter.maxHP;
    clonedCharacter.maxHP = originalCharacter.maxHP;

    map[toI][toJ].character = clonedCharacter;

    addChanges(changeTypes.SPAWN_CHARACTER, [toI, toJ, clonedCharacter]);
  }

  copy() {
    const copy = new DivideModule(this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
