// game
import QueueService from '../../service/queue/Queue.service.js';
import BattleService from "../../service/battle/Battle.service.js";

export default async function cancel(io, socket) {
  console.log("[cancel]", socket.id);

  QueueService.remove(socket.id);
}