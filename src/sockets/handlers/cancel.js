// game
import QueueService from "../../game/Queue.service.js";
import BattleService from "../../game/Battle.service.js";

export default async function cancel(io, socket) {
  console.log("[cancel]", socket.id);

  QueueService.remove(socket.id);
}
