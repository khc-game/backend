// game
import IModule from "./interface/IModule.js";
import TargetingCalculator from "../TargetingCalculator.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class SelfExplosionModule extends IModule {
  constructor(damage) {
    super("Explosion");
    this.damage = damage;
  }

  whereCanUse(map, player, fromI, fromJ) {
    return [[fromI, fromJ]];
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    addChanges(changeTypes.DEAD, [fromI, fromJ]);
    map[fromI][fromJ].character = null;

    const damageCoords = new TargetingCalculator(
      map,
      player,
      fromI,
      fromJ,
      this.patterns,
      this.filters,
    );

    for (let k = 0; k < damageCoords.length; ++k) {
      const [i, j] = damageCoords[k];
      const targetCharacter = map[i]?.[j]?.character;

      if (targetCharacter) {
        targetCharacter.attacked(this.damage);
        addChanges(changeTypes.DAMAGE, [i, j, this.damage]);
      }
    }
  }

  copy() {
    const copy = new SelfExplosionModule(this.damage);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
