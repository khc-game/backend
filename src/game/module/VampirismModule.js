// game
import IModule from "./interface/IModule.js";
import Change from "../Change.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class VampirismModule extends IModule {
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

    opponent.damaged(this.blood);
    character.heal(bloodForPlayer);

    addChanges(Change.heal(fromI, fromJ, bloodForPlayer));
    addChanges(Change.damage(toI, toJ, this.blood));
    if (opponent.hp <= 0) {
      addChanges(Change.dead(toI, toJ));
    }
  }

  copy() {
    const copy = new VampirismModule(this.blood, this.radius, this.cooldown);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
