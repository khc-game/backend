// game
import Cooldown from "./Cooldown.js";
import Timer from "./Timer.js";

// utils
import buildCharacterByKey from "../utils/buildCharacterByKey.js";

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

    this.p1 = p1SocketId;
    this.p2 = p2SocketId;
    this.turn = p1SocketId;
    this.cooldown = new Cooldown();
    this.#initMap();
    this.#initPlayersCharacters(p1, p2);
    this.timer = new Timer(this.p1, this.p2, sessionMinutes);
  }

  #initMap() {
    // create map
    this.map = [];

    const mapSize = 5;
    for (let i = 0; i < mapSize; ++i) {
      const line = [];
      for (let j = 0; j < mapSize; ++j) {
        line.push({ character: null });
      }

      this.map.push(line);
    }
  }

  #initPlayersCharacters(p1, p2) {
    const p1Characters = this.#initPlayerCharacters(p1);
    const p2Characters = this.#initPlayerCharacters(p2);

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
      const char = buildCharacterByKey(charKey, playerId);
      result.push(char);
    }

    return result;
  }

  formatForClient() {
    return {
      map: this.map,
      turn: this.turn,
      players: [this.p1, this.p2],
    };
  }

  getCharByPos(i, j) {
    return this.map[i][j].character;
  }

  toggleTurn() {
    this.turn = this.turn === this.p1 ? this.p2 : this.p1;
    this.timer.switch();
  }

  tryToClearDiedCharacters() {
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

  afterMove(playerId, fromI, fromJ, changes) {
    for (let i = 0; i < this.map.length; ++i) {
      for (let j = 0; j < this.map[i].length; ++j) {
        const { character } = this.map[i][j];
        if (character) {
          if (character.playerId === playerId) {
            character.afterMove(
              this.map,
              playerId,
              fromI,
              fromJ,
              changes,
              i,
              j,
            );
          } else {
            character.reactionAfterEnemyMove(
              this.map,
              playerId,
              fromI,
              fromJ,
              changes,
              i,
              j,
            );
          }
        }
      }
    }
  }

  isOpponentCanUseModule() {
    for (let i = 0; i < this.map.length; ++i) {
      for (let j = 0; j < this.map[i].length; ++j) {
        const cell = this.map[i][j];

        const character = cell.character;
        if (!character || character.playerId !== this.turn) continue;

        const modules = character.modules;
        for (let k = 0; k < modules.length; ++k) {
          const module = modules[k];

          const cooldown = this.cooldown;
          if (cooldown.has(module.id)) continue;

          const whereCanUse = module.whereCanUse(this.map, this.turn, i, j);

          if (whereCanUse.length > 0) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
