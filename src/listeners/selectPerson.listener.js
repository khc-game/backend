// TODO: not use
// classes
import Person from "../classes/Person.js";

// sql
import getUnfinishedRoomSQL from "../database/game/getUnfinishedRoom.sql.js";

export default async function selectPerson(socket, inputData) {
  console.log('-------[select person]');
  console.log("id", socket.id);
}