// constants
import changeTypes from "../constants/changeTypes.js";

export default class Change {
  constructor(changeType, ...data) {
    this.changeType = changeType;
    this.data = data;
  }

  static damage(toI, toJ, damageSize) {
    return new Change(changeTypes.DAMAGE, toI, toJ, damageSize);
  }

  static spawnCharacter(toI, toJ, character) {
    return new Change(changeTypes.SPAWN_CHARACTER, toI, toJ, character);
  }

  static move(fromI, fromJ, toI, toJ) {
    return new Change(changeTypes.MOVE, fromI, fromJ, toI, toJ);
  }

  static heal(fromI, fromJ, healingSize) {
    return new Change(changeTypes.HEAL, fromI, fromJ, healingSize);
  }

  static dead(toI, toJ) {
    return new Change(changeTypes.DEAD, toI, toJ);
  }

  static transformCharacter(toI, toJ, newCharacter) {
    return new Change(changeTypes.TRANSFORM_CHARACTER, toI, toJ, newCharacter);
  }

  static modulesUpdate(modules, charI, charJ) {
    return new Change(changeTypes.MODULES_UPDATE, modules, charI, charJ);
  }
}
