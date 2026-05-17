console.clear();
console.log();
console.log();
console.log();
console.log("===================================================================");

const map = [];

// CREATE MAP
for (let i = 0; i < 30; ++i) {
  const line = [];
  for (let j = 0; j < 50; ++j) {
    line.push({ content: false, isCanMove: false, isChecked: false });
  }

  map.push(line);
}

// MAIN CODE
const dist = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const queue = [
  [10, 10, 10],
];

let head = 0;
while(head < queue.length) {
  const [i, j, radius] = queue[head++];

  if (radius < 0) { continue;} 
  if(map[i][j]) {
    if (map[i][j].content || map[i][j].isChecked) {
      continue;
    } else {
      map[i][j].isChecked = true;
   
      for(const [cx, cy] of dist) {
        const nx = i + cx;
        const ny = j + cy;
        if (map[nx]?.[ny]?.isChecked === false) {
          queue.push([nx, ny, radius - 1]);
        }
      }
    }
  }
}

// SHOW MAP
for (let i = 0; i < map.length; ++i) {
  let str = "";
  for (let j = 0; j < map[i].length; ++j) {
    if (map[i][j].content) {
      str += "# ";
    } else if (map[i][j].isChecked) {
      str += "* ";
    } else if (map[i][j].canMove) {
      str += "+ ";
    } else {
      str += "  ";
    }
  }

  console.log(str);
}

console.log(head);