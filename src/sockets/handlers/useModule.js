// game
import BattleService from "../../game/Battle.service.js";

export default async function useModule(io, socket, args) {
  const { ind, fromI, fromJ, toI, toJ, ...otherData } = args;

  // find room
  const room = BattleService.getRoomBySocketId(socket.id);
  if (!room) return;

  // find game
  const game = BattleService.getGameByRoom(room);
  if (!game) return;

  // check turn
  if (game.turn !== socket.id) return;

  // check character
  const character = game.getCharByPos(fromI, fromJ);
  if (!character) return;
  if (character.hp === 0) return;
  if (character.playerId !== socket.id) return;

  // check module ind
  const modules = character.modules;
  const module = modules[ind];
  if (!module) return;

  // check cooldown
  const cooldown = game.cooldown;
  if (cooldown.has(module.title)) return;

  // use module
  let changes = [];

  const isFirstPlayer = socket.id === game.p1;
  if (module.isShopItem) {
    if (character.shop[1] >= module.cost) {
      character.shop[1] -= module.cost;
      changes = module.use(
        game.map,
        socket.id,
        fromI,
        fromJ,
        toI,
        toJ,
        isFirstPlayer,
      );
    } else {
      return;
    }
  } else {
    changes = module.use(
      game.map,
      socket.id,
      fromI,
      fromJ,
      toI,
      toJ,
      isFirstPlayer,
    );
  }

  // set cooldown
  cooldown.countDownForCurrentPlayer(socket.id);
  if (module.cooldown) {
    cooldown.add(module.id, module.cooldown);
  }

  // call after turn
  game.afterMove(socket.id, fromI, fromJ, changes);

  // change turn
  game.toggleTurn();

  // send changes to client
  io.to(room).emit("module:changes", [changes, game.turn]);

  const closeRoom = () => {
    BattleService.closeRoom(room);
    BattleService.checkInterval();
    io.in(room).socketsLeave(room);
  };

  // check player characters count
  const isHasDiedChar = game.tryToClearDiedCharacters();
  if (isHasDiedChar) {
    const winnerId = game.isEnemyCharactersDestroed();
    if (winnerId) {
      io.to(room).emit("end:killed", { winnerId });
      closeRoom();
    }
  } else {
    // check dead characters
    const isCanOpponentMove = game.isOpponentCanUseModule();
    if (!isCanOpponentMove) {
      io.to(room).emit("end:draw:opponentDontHasMove", { opponent: game.turn });
      closeRoom();
      return;
    }
  }
}
