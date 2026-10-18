// game
import IModule from "./interface/IModule.js";
import Change from "../Change.js";

export default class MoveModule extends IModule {
  constructor() {
    super("Move");
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const character = map[fromI][fromJ].character;
    map[fromI][fromJ].character = null;
    map[toI][toJ].character = character;

    addChanges(Change.move(fromI, fromJ, toI, toJ));
  }

  copy() {
    const copy = new MoveModule(this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
