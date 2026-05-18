export default function findCaUseCollision(canUseAt, toI, toJ, callBack) {
  const changes = [];

  const addChanges = (i, j, newCellData) => {
    changes.push([i, j, newCellData]);
  };

  for (let i = 0; i < canUseAt.length; ++i) {
    const [canI, canJ] = canUseAt[i];

    if (canI === toI && canJ === toJ) {
      callBack(addChanges);
      break;
    }
  }

  return changes;
}
