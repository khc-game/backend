// pattern
import IPattern from "./interface/IPattern.js";

export default class PatternRadiusPattern extends IPattern {
  constructor(radius, rule) {
    super(radius, rule);
  }

  calculate(map, i, j) {
    const dist = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const radius = this.radius;
    const { character: characterRule } = this.rule;

    const queue = [];
    const checked = new Set();
    const availableSlots = [];
    let head = 0;

    checked.add(`${i},${j}`);

    // skip current position
    for (const [cx, cy] of dist) {
      const nx = i + cx;
      const ny = j + cy;
      const checkingKey = `${nx},${ny}`;

      if (map[nx]?.[ny] && !checked.has(checkingKey)) {
        queue.push([nx, ny, radius - 1]);
      }
    }

    // calculate
    while (head < queue.length) {
      const [i, j, radius] = queue[head++];

      if (radius < 0) continue;

      if (map[i] && map[i][j]) {
        const checkingKey = `${i},${j}`;
        // core logic
        checked.add(checkingKey);

        const addNeighbors = () => {
          for (const [cx, cy] of dist) {
            const nx = i + cx;
            const ny = j + cy;
            const checkingKey = `${nx},${ny}`;

            if (map[nx]?.[ny] && !checked.has(checkingKey)) {
              queue.push([nx, ny, radius - 1]);
            }
          }
        };

        // aplly rule
        if (map[i][j].character) {
          if (characterRule.include) {
            availableSlots.push([i, j]);
          }

          if (!characterRule.stop) {
            addNeighbors();
          }
        } else {
          availableSlots.push([i, j]);
          addNeighbors();
        }
      }
    }

    return availableSlots;
  }
}
