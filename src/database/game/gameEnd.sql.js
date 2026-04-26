// mysql
import pool from "../../config/mysql.js";

/**
 * 
 * @param roomId - room SQL id
 */
export default async function gameEnd(roomId, winnerId) {
  try {
    const [rows] = await pool.execute("SELECT * FROM room WHERE ID = ?", [roomId]);

    if (rows.length > 0) {
      const [rows_2] = await pool.execute("UPDATE room SET board = NULL, isGameFinished = 1, winnerId = ? WHERE ID = ?", [winnerId, roomId]);
      if (rows_2.affectedRows > 0) {
        return 1;
      } else {
        console.log(rows_2);
        return 2;
      }
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}