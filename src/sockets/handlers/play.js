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
