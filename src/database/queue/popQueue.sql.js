// mysql
import pool from "../../config/mysql.js";

/**
 * 
 * @returns null or [playerId, persons, removeQueueId];
 */
export default async function popQueue() {
  try {
    // get first player
    const [rows] = await pool.execute(`SELECT * FROM queue ORDER BY id ASC LIMIT 1`);

    // if is empty return null;
    if (rows.length === 0) {
      return null;
    }

    // get first playerId, characters and return it;
    return [rows[0].playerId, JSON.parse(rows[0].persons), rows[0].ID];
  } catch (error) {
    return null;
  }
}