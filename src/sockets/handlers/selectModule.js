// game
import BattleService from "../../game/battle/Battle.service.js";

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

  // check character hp
  if (character.hp === 0) return;

  // check character owner
  if (character.playerId !== socket.id) return;

  // check module ind
  const modules = character.modules;
  const module = modules[ind];
  if (!module) return;

  // check module's cooldown
  const cooldown = game.cooldown;
  if (cooldown.has(socket.id, module.id)) return;

  // check shop
  if (module.isShopItem) {
    if (character.shop[1] < module.cost) return;
  }

  // calculate
  const canUseAt = module.whereCanUse(game.map, socket.id, i, j);

  // send to client
  socket.emit("module:canUseAt", canUseAt);
}
