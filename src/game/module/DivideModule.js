// game
import Module from "./Module.js";

// utils
import getByRadius from "../../utils/getByRadius.js";
import findCanUseCollision from "../../utils/findCanUseCollision.js";

export default class DivideModule extends Module {
  constructor(cooldown) {
    super("Divide");
    this.cooldown = cooldown;
  }

  whereCanUse(map, player, fromI, fromJ) {
    const dist = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const whereCanUse = [];

    for (let i = 0; i < dist.length; ++i) {
      const [mx, my] = dist[i];

      const nx = fromI + mx;
      const ny = fromJ + my;

      const cell = map[nx]?.[ny];

      if (cell && cell?.content?.playerId !== player) {
        return [[fromI, fromJ]];
      }
    }
    
    return [];
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, player, fromI, fromJ);
    if (canUseAt.length === 0) return [];
    
    const dist = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const whereCanUse = [];

    for (let i = 0; i < dist.length; ++i) {
      const [mx, my] = dist[i];

      const nx = fromI + mx;
      const ny = fromJ + my;

      const cell = map[nx]?.[ny];

      if (cell && cell?.content?.playerId !== player) {
        whereCanUse.push([[nx], [ny]]);
      }
    }

    const changes = [];

    const randomInd = Math.floor(Math.random() * (whereCanUse.length));
    const [i, j] = whereCanUse[randomInd];

    const originalCharacter = map[fromI][fromJ].content;
    const clonedCharacter = originalCharacter.clone();
    
    clonedCharacter.hp = originalCharacter.maxHP;
    clonedCharacter.maxHP = originalCharacter.maxHP;
    
    map[i][j].content = clonedCharacter;
    
    changes.push([i, j, map[i][j]]);

    return changes;
  }

  copy() {
    return new DivideModule();
  }
}
