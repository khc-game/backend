// game
import Module from "./interface/Module.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class PotionModule extends Module {
  radius = null;
  heal = null;

  constructor(heal, radius, cooldown) {
    super("Potion", cooldown);
    this.heal = heal;
    this.radius = radius;
  }

  whereCanUse(map, player, fromI, fromJ) {
    const personsPoses = getPersonsByRadius(map, fromI, fromJ, this.radius);
    return personsPoses.filter((pos) => map[pos[0]][pos[1]].character.hp > 1);
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);

    const changes = findCanUseCollision(canUseAt, toI, toJ, (addChanges) => {
      const currentHp = map[toI][toJ].character.hp;
      map[toI][toJ].character.heal(this.heal);
      const updateHp = map[toI][toJ].character.hp;
      addChanges(changeTypes.HEAL, [toI, toJ, updateHp - currentHp]);
    });

    return changes;
  }

  copy() {
    return new PotionModule(this.heal, this.cooldown, this.radius);
  }
}
