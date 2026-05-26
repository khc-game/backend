// game
import Module from "./Module.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

export default class PotionModule extends Module {
  radius = null;
  heal = null;

  constructor(heal, cooldown, radius) {
    super("Potion", cooldown);
    this.heal = heal;
    this.radius = radius;
  }

  whereCanUse(map, player, fromI, fromJ) {
    const personsPoses = getPersonsByRadius(map, fromI, fromJ, this.radius);
    return personsPoses.filter((pos) => map[pos[0]][pos[1]].character.hp > 1)
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);
    
    const changes = findCanUseCollision(canUseAt, toI, toJ, (addChanges) => {
      map[toI][toJ].character.heal(this.heal);
      addChanges(toI, toJ, map[toI][toJ]);
    });

    return changes;
  }

  copy() {
    return new PotionModule(this.heal, this.cooldown, this.radius);
  }
}
