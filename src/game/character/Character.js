// constants
import { characters } from "../../config/characters.js";

export default class Character {
  name = null;
  hp = null;
  maxHP = null;
  playerId = null;
  modules = null;
  key = null;

  constructor(key, playerId) {
    const { hp, name, modules, shop } = characters[key];
    this.hp = hp;
    this.name = name;
    this.maxHP = hp;
    this.playerId = playerId;
    this.modules = [];
    this.key = key;
    this.shop = shop ?? null;

    for (let i = 0; i < modules.length; ++i) {
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
    const clone = new Character(this.key, this.playerId);
    clone.hp = this.maxHP;
    clone.maxHP = this.maxHP;
    clone.modules = this.modules.map((module) => module.copy());

    return clone;
  }

  afterMove(map, playerId, fromI, fromJ, changes) {
    this.modules.forEach((module) =>
      module.afterMove(map, playerId, fromI, fromJ, changes),
    );

    if (this.shop) {
      this.shop[1] += this.shop[2];
    }
  }
}
