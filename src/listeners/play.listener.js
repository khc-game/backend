// config
import { characters } from '../config/characters.js'

export default async function play(io, socket, inputData) {
  console.log('-------[play]');
  console.log("id", socket.id);

  socket.emit("getUserId", socket.id);

  try {
    const selectedPersons = JSON.parse(inputData);

    // if player persons not selected
    if (selectedPersons === null) {
      return socket.emit("message", "Persons is not selected. Select min 1 person");
    }

    // player send not array
    if (!Array.isArray(selectedPersons)) {
      return socket.emit("message", "Invalid data. Is not array");
    }

    // check persons count
    if (selectedPersons.length === 0 || selectedPersons.length > 4) {
      return socket.emit("message", "Max persons count only can be from 1 to 4");
    }

    // check person availability
    for (let i = 0; i < selectedPersons.length; ++i) {
      const person = selectedPersons[i];
      if (!characters[person]) {
        return socket.emit("message", `Undefined person: ${person}`);
      }
    }

    // start match finding
    // TODO
    console.log(selectedPersons);
  } catch (error) {
    socket.emit("message", "Internal server error");
    console.log("Error", error);
  }
}