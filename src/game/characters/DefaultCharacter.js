// interface
import ICharacter from "./interface/ICharacter.js";

export default class DefaultCharacter extends ICharacter {
  constructor({
    key,
    hp,
    name,
    modules,
    cantSelect = false,
    cost = null,
    shop = null,
    playerId = null,
  }) {
    super();
    this.hp = hp;
    this.name = name;
    this.maxHP = hp;
    this.playerId = playerId;
    this.modules = [];
    this.cost = cost;
    this.key = key;
    this.cantSelect = cantSelect;
    this.shop = shop;

    for (let i = 0; i < modules?.length; ++i) {
      const module = modules[i].copy();
      this.modules.push(module);
    }
  }

  attacked(damage) {
    this.hp -= damage;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  heal(amount) {
    this.hp += amount;
    if (this.hp > this.maxHP) {
      this.hp = this.maxHP;
    }
  }

  clone() {
    const clone = new DefaultCharacter(this);

    clone.hp = this.maxHP;
    clone.maxHP = this.maxHP;
    clone.modules = this.modules.map((module) => module.copy());

    return clone;
  }

  afterMove(map, playerId, fromI, fromJ, changes, charI, charJ) {
    console.log("afterMove - Default");
    this.modules.forEach((module) =>
      module.afterMove(map, playerId, fromI, fromJ, changes, charI, charJ),
    );

    if (this.shop) {
      this.shop[1] += this.shop[2];
    }
  }

  afterEnemyMove(map, playerId, fromI, fromJ, changes, charI, charJ) {
    console.log("afterEnemyMove - Default");
  }
}
