// libs
import crypto from 'crypto';

// game
import Game from '../../game/game/Game.game.js';

export default class BattleService {
  static playerRoom = new Map();
  static battles = new Map();
  static timersByRoom = new Set();
  static interval = null;

  static createRoom(p1, p2) {
    const [p1SocketId, p1Characters] = p1;
    const [p2SocketId, p2Characters] = p2;

    const room = crypto.randomUUID();

    const game = new Game(p1, p2);

    BattleService.playerRoom.set(p1SocketId, room);
    BattleService.playerRoom.set(p2SocketId, room);
    BattleService.battles.set(room, game);
    BattleService.timersByRoom.add(room);

    return room;
  }

  static getGameBySocketId(socketId) {
    const room = BattleService.getRoomBySocketId(socketId);
    if (room) {
      return BattleService.getGameByRoom(room);
    }
  }

  static getGameByRoom(room) {
    return BattleService.battles.get(room);
  }

  static getRoomBySocketId(socketId) {
    return BattleService.playerRoom.get(socketId);
  }

  static closeRoom(room) {
    const game = BattleService.getGameByRoom(room);
    if (game) {
      const p1Id = game.p1[0];
      const p2Id = game.p2[0];
  
      BattleService.playerRoom.delete(p1Id);
      BattleService.playerRoom.delete(p2Id);
      BattleService.battles.delete(room);
    }
  }

  static createInterval(io) {
    BattleService.interval = setInterval(() => {
      const timersIterator = BattleService.timersByRoom.values();

      for (const room of timersIterator) {
        const game = BattleService.getGameByRoom(room);
        const timer = game.timer;
        timer.decrease();

        if (timer.currentPlayerTimer.timer < 1) {
          io.to(room).emit("end:time", { lost: timer.currentPlayerTimer.socketId });
          BattleService.timersByRoom.delete(room);
          BattleService.closeRoom(room);
        }
      }
    }, 1000);
  }

  static deleteInterval() {
    clearInterval(BattleService.interval);
    BattleService.interval = null;
  }

  static checkInterval() {
    if (BattleService.timersByRoom.size === 0) {
      BattleService.deleteInterval();
    }
  }
}
