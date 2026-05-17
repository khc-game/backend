// game
import Module from "./Module.js";

// utils
import getByRadius from '../../utils/getByRadius.js';

export default class MoveModule extends Module {
  radius = null;

  constructor(radius) {
    super("Move");
    this.radius = radius;
  }

  whereCanUse(map, i, j) {
    return getByRadius(map, i, j, this.radius);
  }

  use(map, fromI, fromJ, toI, toJ) {
    const canUseAt = this.whereCanUse(map, fromI, fromJ);
    // TODO: foreach and search equal element
  }
}
