// libs
import crypto from 'crypto';

export default class Module {
  title = null;
  cooldown = null;
  id = null;

  constructor(title, cooldown = null) {
    this.title = title;
    this.cooldown = cooldown;
    this.id = crypto.randomUUID();
  }

  whereCanUse(map, player, fromI, fromJ) {
    throw new Error("Must be implemented");
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    throw new Error("Must be implemented");
  }
  
  copy() {
    throw new Error("Must be implemented");
  }
}
