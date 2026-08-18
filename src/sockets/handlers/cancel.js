// game
import QueueService from "../../game/queue/Queue.service.js";
import BattleService from "../../game/battle/Battle.service.js";

export default async function cancel(io, socket) {
  console.log("[cancel]", socket.id);

  QueueService.remove(socket.id);
}
