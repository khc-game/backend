// game
import Module from "./interface/IModule.js";
import TargetingCalculator from "../TargetingCalculator.js";

// utils
import findCanUseCollision from "../../utils/findCanUseCollision.js";

// constants
import changeTypes from "../../constants/changeTypes.js";

export default class MoveModule extends Module {
  constructor() {
    super("Move");
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const character = map[fromI][fromJ].character;
    map[fromI][fromJ].character = null;
    map[toI][toJ].character = character;

    addChanges(changeTypes.MOVE, [fromI, fromJ, toI, toJ]);
  }

  copy() {
    const copy = new MoveModule(this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
