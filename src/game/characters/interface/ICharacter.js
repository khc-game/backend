export default class ICharacter {
  attacked(damage) {}
  heal(amount) {}
  clone() {}
  afterMove(map, playerId, fromI, fromJ, changes, charI, charJ) {}
  reactionAfterEnemyMove(map, playerId, fromI, fromJ, changes, charI, charJ) {}
}
