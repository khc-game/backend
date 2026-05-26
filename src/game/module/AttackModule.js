// game
import Module from "./Module.js";

// utils
import getPersonsByRadius from "../../utils/getPersonsByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

export default class AttackModule extends Module {
  damage = null;
  radius = null;

  constructor(damage, radius) {
    super("Attack");
    this.damage = damage;
    this.radius = radius;
  }

  whereCanUse(map, player, fromI, fromJ) {
    return getPersonsByRadius(map, fromI, fromJ, this.radius);
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);
    
    const changes = findCanUseCollision(canUseAt, toI, toJ, (addChanges) => {
      const cellData = map[fromI][fromJ].character;
      map[toI][toJ].character.attacked(this.damage);

      addChanges(toI, toJ, map[toI][toJ]);
    });

    return changes;
  }

  copy() {
    return new AttackModule(this.damage, this.radius);
  }
}
