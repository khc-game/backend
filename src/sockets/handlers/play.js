// services
import QueueService from "../../game/Queue.service.js";
import BattleService from "../../game/Battle.service.js";

// config
import { characters } from "../../config/characters.js";

export default async function play(io, socket, selectedPersons) {
  console.log("[play]", socket.id);

  // VALIDATIONS

  // cant play again if already in room
  const room = BattleService.getRoomBySocketId(socket.id);
  const isPlayWhilePlaying =
    room || (QueueService.waiting && QueueService.waiting[0] === socket.id);
  if (isPlayWhilePlaying) return;

  // if player characters not selected
  if (selectedPersons === null) {
    return socket.emit(
      "message",
      "Persons is not selected. Select min 1 character",
    );
  }

  // player send not array
  if (!Array.isArray(selectedPersons)) {
    return socket.emit("message", "Invalid data. Is not array");
  }

  // check characters count
  const maxCharacters = 8;
  if (selectedPersons.length === 0 || selectedPersons.length > maxCharacters) {
    return socket.emit(
      "message",
      "Max characters count only can be from 1 to 8",
    );
  }

  // check character availability & cost
  let totalCost = 0;
  for (let i = 0; i < selectedPersons.length; ++i) {
    const character = selectedPersons[i];
    if (!characters[character]) {
      return socket.emit("message", `Undefined character: ${character}`);
    }

    totalCost += characters[character].cost;
  }

  if (totalCost > maxCharacters) {
    return socket.emit("message", `Total cost is bigger than ${maxCharacters}`);
  }

  // GAME

  if (QueueService.waiting === null) {
    QueueService.add(socket.id, selectedPersons, socket.user);
  } else {
    // get enemy
    const enemy = QueueService.waiting;

    const [enemySocketId, _enemyUserData, _enemyCharacters] = enemy;
    QueueService.waiting = null;

    // create room & game
    const sessionMinutes = 10;
    const room = BattleService.createRoom(
      enemy,
      [socket.id, selectedPersons, socket.user],
      sessionMinutes,
    );
    const game = BattleService.getGameByRoom(room);

    // join players to socket room
    const enemySocket = io.sockets.sockets.get(enemySocketId);
    socket.join(room);
    enemySocket.join(room);

    // start timer
    const interval = BattleService.interval;
    if (!interval) {
      BattleService.createInterval(io);
    }

    // send map to players
    const format = game.formatForClient();

    io.to(room).emit("play", format);
  }
}
