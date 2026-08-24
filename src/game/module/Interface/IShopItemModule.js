import IModule from "./IModule.js";

export default class IShopItemModule extends IModule {
  static types = { player: "player" };

  constructor(title, cost, type, cooldown = null) {
    super(title, cooldown);
    this.cost = cost;
    this.type = type;
    this.isShopItem = true;
  }
}
