// service
import BattleService from "../../service/battle/Battle.service.js";
import QueueService from "../../service/queue/Queue.service.js";

export default async function disconnect(io, socket) {
  console.log('[disconnected]', socket.id);

  // remove from queue
  QueueService.remove(socket.id);

  // remove from room
  const room = BattleService.getRoomBySocketId(socket.id);
  if (!room) return;

  const game = BattleService.getGameByRoom(room);
  BattleService.closeRoom(room);
  BattleService.checkInterval();
  socket.to(room).emit("end:leave");
}