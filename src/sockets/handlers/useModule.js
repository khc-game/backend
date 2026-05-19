// game
import BattleService from "../../service/battle/Battle.service.js";

export default async function useModule(io, socket, args) {
  const { ind, fromI, fromJ, toI, toJ } = args;

  // find room
  const room = BattleService.getRoomBySocketId(socket.id);
  if (!room) return;

  // find game
  const game = BattleService.getGameByRoom(room);
  if (!game) return;

  // check turn
  if (game.turn !== socket.id) return;

  // check character on position
  const character = game.getCharByPos(fromI, fromJ);
  if (!character) return;

  // check character hp
  if (character.hp === 0) return;

  // check character owner
  if (character.playerId !== socket.id) return;

  // check module ind
  const modules = character.modules;
  const module = modules[ind];
  if (!module) return;
  
  // calculate
  const changes = module.use(game.map, socket.id, fromI, fromJ, toI, toJ);

  // change turn
  game.toggleTurn();

  // send changes to client
  io.to(room).emit("module:mapUpdate", [changes, game.turn]);
}
