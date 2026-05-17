// game
import BattleService from "../../service/battle/Battle.service.js";

export default async function selectModule(io, socket, args) {
  const { i, j, ind } = args;

  // find game
  const game = BattleService.getGameBySocketId(socket.id);
  if (!game) return;

  // check turn
  if (game.turn !== socket.id) return;

  // check character on position
  const character = game.getCharByPos(i, j);
  if (!character) return;

  // check character owner
  if (character.playerId !== socket.id) return;

  // check module ind
  const modules = character.modules;
  const module = modules[ind];
  if (!module) return;
  
  // calculate
  const canUseAt = module.whereCanUse(game.map, i, j);

  // send to client
  socket.emit("module:canUseAt", canUseAt);
}