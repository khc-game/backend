// game
import DefaultCharacter from "./DefaultCharacter.js";
import Change from "../Change.js";

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

  reactionAfterEnemyMove(map, playerId, fromI, fromJ, changes, charI, charJ) {
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
          const JarShardCharacter = buildCharacterByKey("jar_shard", playerId);
          const change = Change.spawnCharacter(nI, nJ, JarShardCharacter);

          map[nI][nJ].character = JarShardCharacter;
          changes.push(change);
        }
      }
    }
  }
}
