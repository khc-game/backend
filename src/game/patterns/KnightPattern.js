// pattern
import IPattern from "./interface/IPattern.js";

export default class KnightPattern extends IPattern {
  constructor(rule) {
    super(0, rule);
  }

  calculate(map, fromI, fromJ) {
    const dist = [
      [-2, 1],
      [-2, -1],
      [2, 1],
      [2, -1],
      [-1, 2],
      [1, 2],
      [1, -2],
      [-1, -2],
    ];

    const { character: characterRule } = this.rule;
    const availableSlots = [];

    for (let i = 0; i < dist.length; ++i) {
      const [posI, posJ] = dist[i];
      const nI = posI + fromI;
      const nJ = posJ + fromJ;

      if (map[nI]?.[nJ]) {
        if (map[nI]?.[nJ]?.character) {
          if (characterRule.include) {
            availableSlots.push([nI, nJ]);
          }
        } else {
          availableSlots.push([nI, nJ]);
        }
      }
    }

    return availableSlots;
  }
}
