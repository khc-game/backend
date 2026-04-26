// classes
import Person from "../classes/Person.js";

// sql
import getUnfinishedRoomSQL from "../database/game/getUnfinishedRoom.sql.js";

export default async function selectPerson(socket, inputData) {
  console.log('-------[select person]');
  console.log("id", socket.id);

  try {
    // input data
    const parseData = JSON.parse(inputData);
    const from = parseData.from;
    const playerId = socket.id;
    
    // check room
    const room = await getUnfinishedRoomSQL(playerId);

    if (!room) {
      socket.emit("message", "Room not found");
      return;
    }
    
    // check turn
    if (room.turn !== playerId) {
      socket.emit("message", "[3] now is not your turn");
      return;
    }

    const cell = room.getCell(from.i, from.j);
    const person = cell.person;
    person.__proto__ = Person.prototype;
    person.modules = person.getModulesJSON(person.modules);
    
    // check if person owner is player
    if (person.playerId !== playerId) {
      socket.emit("message", "[2] this person is not yours");
      return;
    }

    // get modules and emit to player
    const modules = person.getModulesJSON();
    socket.emit("showModules", JSON.stringify(modules));
  } catch (error) {
    socket.emit("message", "[1] cant select person");
  }
}