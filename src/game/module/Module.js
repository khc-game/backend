export default class Module {
  title = null;
  cooldown = null;

  constructor(title, cooldown = null) {
    this.title = title;
    this.cooldown = cooldown;
  }

  whereCanUse(map, player, fromI, fromJ) {
    throw new Error("Must be implemented");
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    throw new Error("Must be implemented");
  }
}
