// classes
import Room from "./Room.js";

// db
import popQueueSQL from '../database/queue/popQueue.sql.js';
import addQueueSQL from '../database/queue/addQueue.sql.js';
import removeQueueSQL from '../database/queue/removeQueue.sql.js';
import endGameSQL from '../database/game/gameEnd.sql.js';
import getUnfinishedRoomSQL from '../database/game/getUnfinishedRoom.sql.js'
import getuserByIdSQL from "../database/queue/getUserById.sql.js"

class Game {
  /**
   * 
   * @param {string} playerId - socket.id
   * @param {Array} playerPersons - array with persons indexes
  */
  static async searchGame(socket, playerPersons) {
    const playerId = socket.id;

    const isPlayerAlreadyInGame = await getUnfinishedRoomSQL(playerId)

    if (isPlayerAlreadyInGame) {
      socket.emit("message", "You already in game");
      return;
    }

    const isUserInQueue = await getuserByIdSQL(playerId);

    if (isUserInQueue) {
      socket.emit("message", "You already searching game");
      return;
    }

    const isOtherPlayerWaitingMatch = await popQueueSQL();

    if (isOtherPlayerWaitingMatch) {
      const [opponentId, opponentPersons] = isOtherPlayerWaitingMatch;
      new Room(socket, playerId, opponentId, playerPersons, opponentPersons, isOtherPlayerWaitingMatch[2]);
    } else {
      const result = await addQueueSQL(playerId, playerPersons);
      socket.emit("message", result);
    }
  }

  static async removeFromQueue(socket) {
    const playerId = socket.id;

    if (await removeQueueSQL(playerId)) {
      socket.emit("canceledPlay");
    } else {
      socket.emit("message", "Cant canceled - Something went wrong");
    }
  }

  static async gameEndByPlayerId(socket, message) {
    const playerId = socket.id;
    
    try {
      const room = await getUnfinishedRoomSQL(playerId);

      if (!room) {
        socket.emit("message", "cant end game");
        return;
      }

      const result = await endGameSQL(room.ID, (playerId === room.player_1 ? room.player_2 : room.player_1));
      
      if (result) {
        io.to(room.player_1).emit("gameEndResult", message);
        io.to(room.player_2).emit("gameEndResult", message);
      } else {
        socket.emit("message", "Cant end game");
      }
    } catch (error) {
      console.log("[1] del session error", error);
    }
  }
};

export default Game;
