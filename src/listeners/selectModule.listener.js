// TODO: not use
// classes
import Person from '../classes/Person.js';

// sql
import getUnfinishedRoomSQL from '../database/game/getUnfinishedRoom.sql.js';

export default async function selectModule(socket, inputData) {
  console.log('-------[select module]');
  console.log("id", socket.id);
}