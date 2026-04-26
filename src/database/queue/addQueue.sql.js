// mysql
import pool from "../../config/mysql.js";

export default async function addQueue(playerId, characters) {
  // add player and character in DB queue
  try {
    const result = await pool.execute("INSERT INTO queue (playerId, persons) VALUES (?, ?)", [playerId, JSON.stringify(characters)]);

    if (result[0].affectedRows >= 1) {
      return "Searching game";
    } else {
      return "Cant search game";
    }
  } catch (error) {
    return "Something went wrong";
  }
}