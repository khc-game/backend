export default class Module {
  title = null;

  constructor(title) {
    this.title = title;
  }

  whereCanUse(map, player, fromI, fromJ) {
    throw new Error("Must be implemented");
  }

  use(map, player, fromI, fromJ, toI, toJ) {
    throw new Error("Must be implemented");
  }
}
