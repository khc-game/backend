export default function findCaUseCollision(canUseAt, toI, toJ, callBack) {
  const changes = [];

  const addChanges = (change) => {
    changes.push(change);
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
