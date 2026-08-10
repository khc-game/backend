export default function findCaUseCollision(canUseAt, toI, toJ, callBack) {
  const changes = [];

  const addChanges = (changeType, data) => {
    changes.push({ changeType, data });
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
