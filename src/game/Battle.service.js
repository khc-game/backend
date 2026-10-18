// libs
import crypto from "crypto";

// game
import Game from "../game/Game.js";

export default class BattleService {
  static playerRoom = new Map();
  static battles = new Map();
  static timersByRoom = new Set();
  static interval = null;

  static createRoom(p1, p2, sessionMinutes) {
    const [p1SocketId, _p1Characters, _p1UserData] = p1;
    const [p2SocketId, _p2Characters, _p2UserData] = p2;

    const room = crypto.randomUUID();

    const game = new Game(p1, p2, sessionMinutes);

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
      const p1Id = game.p1;
      const p2Id = game.p2;

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
        if (game) {
          const timer = game.timer;
          timer.decrease();

          if (timer.currentPlayerTimer.timer < 1) {
            io.to(room).emit("end:time", {
              lost: timer.currentPlayerTimer.socketId,
            });
            BattleService.timersByRoom.delete(room);
            BattleService.closeRoom(room);
            io.in(room).socketsLeave(room);
          }
        } else {
          BattleService.timersByRoom.delete(room);
          BattleService.checkInterval();
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
