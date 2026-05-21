// game
import Module from "./Module.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

export default class BuffModule extends Module {
  constructor(cooldown) {
    super("Buff");
    this.cooldown = cooldown;
  }

  whereCanUse(map, player, fromI, fromJ) {
    return [[fromI, fromJ]];
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    map[fromI][fromJ].content.hp += 5;
    map[fromI][fromJ].content.maxHP += 5;

    console.log(map[fromI][fromJ].content);

    return [[fromI, fromJ, map[fromI][fromJ]]];
  }

  copy() {
    return new BuffModule(this.cooldown);
  }
}
