// game
import Character from "../character/Character.js";

export default class Game {
  p1 = null;
  p2 = null;
  turn = null;
  map = null;
  // TODO: add cooldown for modules

  constructor(p1, p2) {
    const [p1SocketId, p1Characters] = p1;
    const [p2SocketId, p2Characters] = p2;

    this.p1 = p1;
    this.p2 = p2;
    this.turn = p1SocketId;
    this.#initMap();
  }

  #initMap() {
    // create map
    this.map = [];

    const mapSize = 8;
    for (let i = 0; i < mapSize; ++i) {
      const line = [];
      for (let j = 0; j < mapSize; ++j) {
        line.push({ content: null });
      }

      this.map.push(line);
    }

    // add characters in map
    this.#initPlayersCharacters();
  }

  #initPlayersCharacters() {
    const p1Characters = this.#initPlayerCharacters(this.p1);
    const p2Characters = this.#initPlayerCharacters(this.p2);

    for (let i = 0; i < p1Characters.length; ++i) {
      this.map[0][i].content = p1Characters[i];
    }

    for (let i = 0; i < p2Characters.length; ++i) {
      this.map[7][7 - i].content = p2Characters[i];
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
    return this.map[i][j].content;
  }

  toggleTurn() {
    this.turn = this.turn === this.p1[0] ? this.p2[0] : this.p1[0];
  }
}
