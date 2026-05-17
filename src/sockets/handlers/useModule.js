// game
import BattleService from "../../service/battle/Battle.service.js";

export default async function useModule(io, socket, args) {
  const { ind, fromI, fromJ, toI, toJ } = args;

  // find game
  const game = BattleService.getGameBySocketId(socket.id);
  if (!game) return;

  // check turn
  if (game.turn !== socket.id) return;

  // check character on position
  const character = game.getCharByPos(fromI, fromJ);
  if (!character) return;

  // check character owner
  if (character.playerId !== socket.id) return;

  // check module ind
  const modules = character.modules;
  const module = modules[ind];
  if (!module) return;
  
  // calculate
  module.use(game.map, fromI, fromJ, toI, toJ);

  // TODO: придумать как отправить измененные данные клиенту
  // Вариант 1: из .use() вернуть позиции всех клеток что изменилось
  // Вариант 2: основываясь на типе модуля отправить соответствующее сообщение

  // TODO check live characters
}
