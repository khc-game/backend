// mysql
import pool from "../../config/mysql.js";

export default async function gameInit(room) {
  try {
    const [rows] = await pool.execute(`
      INSERT INTO room 
      (player_1, player_2, turn, initBoard, board)
      VALUES (?, ?, ?, ?, ?)`,
      [room.p1, room.p2, room.turn, JSON.stringify(room.board), JSON.stringify(room.board)]
    );

    if (rows.insertId) {
      return { roomId: rows.insertId }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}