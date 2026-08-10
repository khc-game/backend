// game
import Module from "./Module.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class VampirismModule extends Module {
  blood = null;
  radius = null;

  constructor(blood, radius) {
    super("Vampirism");
    this.blood = blood;
    this.radius = radius;
  }

  whereCanUse(map, player, fromI, fromJ) {
    return getPersonsByRadius(map, fromI, fromJ, this.radius);
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
    });

    return changes;
  }

  copy() {
    return new VampirismModule(this.blood, this.radius);
  }
}
