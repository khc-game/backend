// service
import BattleService from "../../service/battle/Battle.service.js";
import QueueService from "../../service/queue/Queue.service.js";

export default async function disconnect(io, socket) {
  console.log('[disconnected]', socket.id);

  // remove from queue
  const isWaiterPlayer = QueueService.waiting !== null && QueueService.waiting[0] === socket.id;
  if (isWaiterPlayer) {
    QueueService.waiting = null;
  }

  // remove from room
  const room = BattleService.getRoomBySocketId(socket.id);
  if (room) {
    const game = BattleService.getGameByRoom(room);
    BattleService.closeRoom(room);
    socket.to(room).emit("end:leave");
  }
}