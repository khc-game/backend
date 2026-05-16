export default class Game {
  p1 = null;
  p2 = null;
  turn = null;
  map = null;

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
    
  }

  formatForClient() {
    return {
      map: this.map,
      turn: this.turn,
      players: [this.p1[0], this.p2[0]],
    };
  }
}
