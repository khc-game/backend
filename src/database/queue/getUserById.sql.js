// sql
import pool from '../../config/mysql.js'

export default async function getUserById(playerId) {
  try {
    const [rows] = await pool.execute("SELECT * FROM queue WHERE playerId = ?", [playerId]);
    
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}