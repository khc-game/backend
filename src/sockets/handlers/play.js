// services
import QueueService from '../../service/queue/Queue.service.js';
import BattleService from '../../service/battle/Battle.service.js';

// config
import { characters } from '../../config/characters.js'

export default async function play(io, socket, selectedPersons) {
  console.log('[play]', socket.id);

  // VALIDATIONS

  // cant play again if already in room
  const room = BattleService.getRoomBySocketId(socket.id);
  const isPlayWhilePlaying = room || (QueueService.waiting && QueueService.waiting[0] === socket.id);
  if (isPlayWhilePlaying) return;

  // if player characters not selected
  if (selectedPersons === null) {
    return socket.emit("message", "Persons is not selected. Select min 1 character");
  }

  // player send not array
  if (!Array.isArray(selectedPersons)) {
    return socket.emit("message", "Invalid data. Is not array");
  }

  // check characters count
  const maxCharacters = 8;
  if (selectedPersons.length === 0 || selectedPersons.length > maxCharacters) {
    return socket.emit("message", "Max characters count only can be from 1 to 8");
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
    return socket.emit("message", `Total cost is biggest than ${maxCharacters}`);
  }

  // GAME
  
  if (QueueService.waiting === null) {
    QueueService.add(socket.id, selectedPersons);
  } else {
    const enemy = QueueService.waiting;
    const [enemySocketId, enemyCharacters] = enemy;
    QueueService.waiting = null;

    const room = BattleService.createRoom(enemy, [socket.id, selectedPersons]);
    const game = BattleService.getGameByRoom(room);

    const enemySocket = io.sockets.sockets.get(enemySocketId);

    socket.join(room);
    enemySocket.join(room);
    
    io.to(room).emit("play", game.formatForClient());
  }
}
