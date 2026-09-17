// game
import Character from "./Character.js";
import Cooldown from "./Cooldown.js";
import Timer from "./Timer.js";

// constants
import changeTypes from "../constants/changeTypes.js";

export default class Game {
  p1 = null;
  p2 = null;
  turn = null;
  map = null;
  cooldown = null;
  timer = null;

  constructor(p1, p2, sessionMinutes) {
    const p1SocketId = p1[0];
    const p2SocketId = p2[0];

    this.p1 = p1;
    this.p2 = p2;
    this.turn = p1SocketId;
    this.cooldown = new Cooldown();
    this.#initMap();
    this.#initPlayersCharacters();
    this.timer = new Timer(p1SocketId, p2SocketId, sessionMinutes);
  }

  #initMap() {
    // create map
    this.map = [];

    const mapSize = 8;
    for (let i = 0; i < mapSize; ++i) {
      const line = [];
      for (let j = 0; j < mapSize; ++j) {
        line.push({ character: null });
      }

      this.map.push(line);
    }
  }

  #initPlayersCharacters() {
    const p1Characters = this.#initPlayerCharacters(this.p1);
    const p2Characters = this.#initPlayerCharacters(this.p2);

    this.p1[1] = p1Characters;
    this.p2[1] = p2Characters;

    {
      let midIndex =
        Math.floor(this.map.length / 2) - Math.floor(p1Characters.length / 2);
      midIndex = midIndex < 0 ? 0 : midIndex;

      for (let i = 0; i < p1Characters.length; ++i) {
        this.map[0][midIndex + i].character = p1Characters[i];
      }
    }

    {
      let midIndex =
        Math.floor(this.map.length / 2) - Math.floor(p2Characters.length / 2);
      midIndex = midIndex < 0 ? 0 : midIndex;

      for (let i = 0; i < p2Characters.length; ++i) {
        this.map[this.map.length - 1][midIndex + i].character = p2Characters[i];
      }
    }
  }

  #initPlayerCharacters(playerData) {
    const [playerId, charsKeys] = playerData;
    const result = [];

    for (let i = 0; i < charsKeys.length; ++i) {
      const charKey = charsKeys[i];
      result.push(new Character(charKey, playerId));
    }

    return result;
  }

  formatForClient() {
    return {
      map: this.map,
      turn: this.turn,
      players: [this.p1[0], this.p2[0]],
    };
  }

  getCharByPos(i, j) {
    return this.map[i][j].character;
  }

  toggleTurn() {
    this.turn = this.turn === this.p1[0] ? this.p2[0] : this.p1[0];
    this.timer.switch();
  }

  tryToClearDiedCharactersByChanges(changes) {
    // ! NEED refactor
    // let isHasDiedChar = false;
    // for (let i = 0; i < changes.length; ++i) {
    //   const { changeType, data } = changes[i];
    //   const [posI, posJ] = data;
    //   const cellData = this.map[posI][posJ];
    //   if (cellData.character && cellData.character.hp === 0) {
    //     cellData.character = null;
    //     isHasDiedChar = true;
    //   }
    // }
    // return isHasDiedChar;
  }

  tryToClearDiedCharacters() {
    // using instead of tryToClearDiedCharactersByChanges

    let isHasDiedChar = false;

    for (let i = 0; i < this.map.length; ++i) {
      for (let j = 0; j < this.map[i].length; ++j) {
        const cellData = this.map[i][j];

        if (cellData.character && cellData.character.hp <= 0) {
          cellData.character = null;
          isHasDiedChar = true;
        }
      }
    }

    return isHasDiedChar;
  }

  isEnemyCharactersDestroed() {
    const players = new Set();

    for (let i = 0; i < this.map.length; ++i) {
      for (let j = 0; j < this.map[i].length; ++j) {
        const { character } = this.map[i][j];
        if (character) {
          players.add(character.playerId);
          if (players.size > 1) {
            return null;
          }
        }
      }
    }

    return Array.from(players)[0];
  }

  afterMove(map, playerId, fromI, fromJ, changes) {
    for (let i = 0; i < this.map.length; ++i) {
      for (let j = 0; j < this.map[i].length; ++j) {
        const { character } = this.map[i][j];
        if (character && character.playerId === playerId) {
          character.afterMove(map, playerId, fromI, fromJ, changes);
        }
      }
    }
  }

  isOpponentCanUseModule(fromI, fromJ) {
    const playerCharacters = this.turn === this.p1[0] ? this.p1[1] : this.p2[1];
    for (let i = 0; i < playerCharacters.length; ++i) {
      const character = playerCharacters[i];
      const modules = character.modules;
      for (let j = 0; j < modules.length; ++j) {
        const module = modules[i];

        const cooldown = this.cooldown;
        if (cooldown.has(module.id)) continue;

        const whereCanUse = module.whereCanUse(
          this.map,
          this.turn,
          fromI,
          fromJ,
        );
        if (whereCanUse.length > 0) {
          return true;
        }
      }
    }

    return false;
  }
}
