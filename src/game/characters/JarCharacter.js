// classes
import DefaultCharacter from "./DefaultCharacter.js";

// utils
import buildCharacterByKey from "../../utils/buildCharacterByKey.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class JarCharacter extends DefaultCharacter {
  constructor({ key, hp, name, modules, cantSelect, cost, shop, playerId }) {
    super({
      key,
      hp,
      name,
      modules,
      cantSelect,
      cost,
      shop,
      playerId,
    });
  }

  clone() {
    const clone = new JarCharacter(this);

    clone.hp = this.maxHP;
    clone.maxHP = this.maxHP;
    clone.modules = this.modules.map((module) => module.copy());

    return clone;
  }

  enemyReactionAfterMove(map, playerId, fromI, fromJ, changes, charI, charJ) {
    if (this.hp <= 0) {
      map[charI][charJ].character = null;

      const dist = [
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
        [0, 0],
      ];

      const maxShards = 3;
      let currentShards = 0;

      for (let k = 0; k < dist.length; ++k) {
        const [dI, dJ] = dist[k];
        const nI = charI + dI;
        const nJ = charJ + dJ;

        if (map?.[nI]?.[nJ]?.character === null) {
          if (currentShards++ === maxShards) break;

          const playerId = this.playerId;
          const jar_shard = buildCharacterByKey("jar_shard", playerId);
          const change = {
            changeType: changeTypes.SPAWN_CHARACTER,
            data: [nI, nJ, jar_shard],
          };

          map[nI][nJ].character = jar_shard;
          changes.push(change);
        }
      }
    }
  }
}
