// game
import BattleService from "../../service/battle/Battle.service.js";

export default async function resign(io, socket) {
  const room = BattleService.getRoomBySocketId(socket.id);
  BattleService.closeRoom(room);
  
  socket.to(room).emit("end:resign");
}