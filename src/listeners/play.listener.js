// classes
import Game from '../classes/Game.js';

// utils
import personsCreate from '../utils/personsCreate.js'

// config
import characters from '../config/characters.js'

export default async function play(socket, inputData) {
  console.log('-------[play]');
  console.log("id", socket.id);

  socket.emit("getUserId", socket.id);

  try {
    const selectedPersons = JSON.parse(inputData);

    // if player persons not selected
    if (selectedPersons === null) {
      return socket.emit("showPersons", JSON.stringify(personsCreate(characters)));
    }

    // player send not array
    if (!Array.isArray(selectedPersons)) {
      socket.emit("message", "[1] Invalid data. Is not array");
      socket.emit("showPersons", JSON.stringify(personsCreate(characters)));
      return;
    }

    // check persons count
    if (selectedPersons.length === 0 || selectedPersons.length > 4) {
      socket.emit("message", "[2] Max persons count only can be from 1 to 4" + ` your is: ${selectedPersons.length}`);
      socket.emit("showPersons", JSON.stringify(personsCreate(characters)));
      return;
    }

    // check person availability
    for (let i = 0; i < selectedPersons.length; ++i) {
      const personInd = selectedPersons[i];
      if (!characters[personInd]) {
        socket.emit("showPersons", JSON.stringify(personsCreate(characters)));
        return socket.emit("message", "[3] Invalid person index \"" + personInd + "\"");
      }
    }

    // start match finding
    Game.searchGame(socket, selectedPersons);
  } catch (error) {
    socket.emit("message", "[4] Invalid data");
    console.log("Error", error);
  }
}