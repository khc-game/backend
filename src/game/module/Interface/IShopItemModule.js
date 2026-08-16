import Module from "./IModule.js";

export default class IShopItemModule extends Module {
  static types = { player: "player" };

  constructor(title, cost, type, cooldown = null, shop = null) {
    super(title, cooldown);
    this.cost = cost;
    this.type = type;
    this.isShopItem = true;
  }
}
