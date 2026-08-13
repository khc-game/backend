// game
import Module from "./Module.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class BuffModule extends Module {
  constructor(cooldown, buffSize) {
    super("Buff");
    this.cooldown = cooldown;
    this.buffSize = buffSize;
  }

  whereCanUse(map, player, fromI, fromJ) {
    return [[fromI, fromJ]];
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    map[fromI][fromJ].character.hp += this.buffSize;
    map[fromI][fromJ].character.maxHP += this.buffSize;

    return [
      {
        changeType: changeTypes.BUFF,
        data: [fromI, fromJ, "hp", this.buffSize],
      },
      {
        changeType: changeTypes.BUFF,
        data: [fromI, fromJ, "maxHp", this.buffSize],
      },
    ];
  }

  copy() {
    return new BuffModule(this.cooldown);
  }
}
