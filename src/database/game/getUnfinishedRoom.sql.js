// classes
import Room from '../../classes/Room.js';

// mysql
import pool from "../../config/mysql.js"

export default async function getUnfinishedRoom(playerId) {
  try {
    // get room by playerId and not finished, parse with prototype and return
    const [rows] = await pool.execute("SELECT * FROM room WHERE (player_1 = ? OR player_2 = ?) AND isGameFinished = 0", [playerId, playerId]);
    
    if (rows.length > 0) {
      const room = rows[0];
      room.board = JSON.parse(room.board);
      room.__proto__ = Room.prototype;
      return room;
    } else {
      return null;
    }
  } catch (error) {
    console.log("[SQL][catch](getUnfinishedRoom)", error);
    return null;
  }
}