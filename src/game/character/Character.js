// game
import ModuleFactory from "../module/ModuleFactory.js";

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
    const { hp, name, modules } = characters[key];
    this.hp = hp;
    this.name = name;
    this.maxHP = hp;
    this.playerId = playerId;
    this.modules = [];
    this.key = key;

    for (let i = 0; i < modules.length; ++i) {
      const module = ModuleFactory.create(modules[i]);
      if (module) {
        this.modules.push(module);
      } else {
        console.warn("undefined module");
      }
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
}