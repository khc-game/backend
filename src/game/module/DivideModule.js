// game
import IModule from "./interface/IModule.js";
import Change from "../Change.js";

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

    addChanges(Change.spawnCharacter(toI, toJ, clonedCharacter));
  }

  copy() {
    const copy = new DivideModule(this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
