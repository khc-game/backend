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
  if (selectedPersons.length === 0 || selectedPersons.length > 4) {
    return socket.emit("message", "Max characters count only can be from 1 to 4");
  }

  // check character availability
  for (let i = 0; i < selectedPersons.length; ++i) {
    const character = selectedPersons[i];
    if (!characters[character]) {
      return socket.emit("message", `Undefined character: ${character}`);
    }
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
