// pattern
import IPattern from "./interface/IPattern.js";

export default class DiagonalPattern extends IPattern {
  constructor(radius, rule) {
    super(radius, rule);
  }

  calculate(map, fromI, fromJ) {
    const dists = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ];

    const pointers = [
      [fromI, fromJ, false],
      [fromI, fromJ, false],
      [fromI, fromJ, false],
      [fromI, fromJ, false],
    ];

    const { character: characterRule } = this.rule;
    const availableSlots = [];
    let radius = this.radius;

    while (radius > 0) {
      for (let i = 0; i < pointers.length; ++i) {
        const [toI, toJ, isToStop] = pointers[i];
        if (isToStop) continue;

        const [dI, dJ] = dists[i];
        const nI = toI + dI;
        const nJ = toJ + dJ;

        const cell = map[nI]?.[nJ];

        if (cell) {
          if (cell.character) {
            if (characterRule.include) {
              availableSlots.push([nI, nJ]);
            }

            if (characterRule.stop) {
              pointers[i][2] = true;
            }
          } else {
            availableSlots.push([nI, nJ]);
          }

          if (pointers[i][2] === false) {
            pointers[i][0] += dists[i][0];
            pointers[i][1] += dists[i][1];
          }
        }
      }

      --radius;
    }

    return availableSlots;
  }
}
