// interface
import IModule from "../Interfaces/IModule.js";

class MoveModule extends IModule {
  constructor(radius) {
    super("MoveModule", null);
    this.radius = radius;
  }

  select(map_ref, i, j) {
    return [[2, 2], [3, 5]];
  }

  use(map_ref, i, j) {
    return [[6, 6], [5, 5]];
  }
}

export default MoveModule;