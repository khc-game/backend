// game
import MoveModule from "./MoveModule.js";

// constants
import changeTypes from "../../constants/changeTypes.js";
import { characterKeys } from "../../config/characters.js";
import Character from "../Character.js";

export default class MovePawnModule extends MoveModule {
  constructor() {
    super();
  }

  useLogic(map, player, fromI, fromJ, toI, toJ, addChanges, isFirstPlayer) {
    const character = map[fromI][fromJ].character;
    map[fromI][fromJ].character = null;
    map[toI][toJ].character = character;

    addChanges(changeTypes.MOVE, [fromI, fromJ, toI, toJ]);

    let isOpponentLine = false;
    if (isFirstPlayer) {
      isOpponentLine = toI === map.length - 1;
    } else {
      isOpponentLine = toI === 0;
    }

    if (isOpponentLine) {
      const newCharacter = new Character(characterKeys.chess_queen, player);
      map[toI][toJ].character = newCharacter;
      addChanges(changeTypes.TRANSFORM_CHARACTER, [toI, toJ, newCharacter]);
    }
  }

  copy() {
    const copy = new MovePawnModule(this.radius);
    copy.patterns = this.patterns;
    copy.filters = this.filters;
    return copy;
  }
}
