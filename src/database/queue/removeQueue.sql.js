// mysql
import pool from "../../config/mysql.js";

export default async function removeQueue(playerId) {
  try {
    // remove player from queue
    const [rows] = await pool.execute("DELETE FROM queue WHERE playerId = ?", [playerId]);
    
    if (rows.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
