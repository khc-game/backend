// game
import BattleService from "../../game/Battle.service.js";

export default async function resign(io, socket) {
  const room = BattleService.getRoomBySocketId(socket.id);
  BattleService.closeRoom(room);
  BattleService.checkInterval();

  socket.to(room).emit("end:resign");
  io.in(room).socketsLeave(room);
}
