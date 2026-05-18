export default function getByRadius(map, i, j, radius) {
  const dist = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

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
      if (map[i][j].content || checked.has(checkingKey)) {
        continue;
      } else {
        // core logic
        checked.add(checkingKey);
        availableSlots.push([i, j]);

        // add neighbors
        for (const [cx, cy] of dist) {
          const nx = i + cx;
          const ny = j + cy;
          const checkingKey = `${nx},${ny}`;

          if (map[nx]?.[ny] && !checked.has(checkingKey)) {
            queue.push([nx, ny, radius - 1]);
          }
        }
      }
    }
  }

  return availableSlots;
}
