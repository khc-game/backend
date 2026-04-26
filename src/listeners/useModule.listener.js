// classes
import Person from '../classes/Person.js';

// sql
import getUnfinishedRoomSQL from '../database/game/getUnfinishedRoom.sql.js';

export default async function useModule(socket, inputData) {
  console.log('-------[use module]');
  console.log("id", socket.id);

  try {
    // input data
    const parseData = JSON.parse(inputData);
    const playerId = socket.id;
    const from = parseData.from;
    const to = parseData.to;
    const moduleInd = parseData.moduleInd;

    const room = getUnfinishedRoomSQL(playerId);

    // check turn
    if (room.turn !== playerId) {
      socket.emit("message", "[2] now is not your turn");
      return;
    }

    const cell = room.getCell(from.i, from.j);
    const person = cell.person;
    person.__proto__ = Person.prototype;

    // check from person owner is player
    if (person.playerId !== playerId) {
      socket.emit("message", "[3] this person is not yours");
      return;
    }

    // check person have module
    const module = person.modules[moduleInd];
    if (!module) {
      socket.emit("message", "[4] module not found");
    }

    // calculate where can use this module and send positions to player
    const whereCanUseModulePositions = module.select(room.board, from.i, from.j);

    for (let i = 0; i < whereCanUseModulePositions.length; ++i) {
      const potentialMovePosition = whereCanUseModulePositions[i];

      if (potentialMovePosition[0] === to.i && potentialMovePosition[1] === to.j) {
        const opponentId = ((room.p1 === socket.id) ? room.p2 : room.p1);

        socket.emit("setBoard", JSON.stringify(room.board));
        io.to(opponentId).emit("setBoard", JSON.stringify(room.board));

        socket.emit("turnChange", room.turn);
        io.to(opponentId).emit("turnChange", room.turn);
        return;
      }
    }
  } catch (error) {
    socket.emit("message", "[1] cant use module");
  }
}