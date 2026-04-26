// utils
import moduleBuilder from "../utils/moduleBuilder.js";

class Person {
  constructor(playerId, name, hp, inputModules, img) {
    this.playerId = playerId;
    this.name = name;
    this.hp = hp;
    this._mapHP = hp;
    this.modules = inputModules;
    this.img = img;
    this.isDead = false;
  }

  getModulesJSON() {
    const modules = [];

    for (let i = 0; i < this.modules.length; ++i) {
      const module = moduleBuilder(this.modules[i]);
      modules.push(module);
    }

    return modules;
  }

  damage(damage) {
    this.hp -= damage;

    if (this.hp < 1) {
      this.isDead = true;
    }
  }

  afterMove() {
    for (let i = 0; i < this.modules.length; ++i) {
      this.modules[i].afterMove(this.map_ref);
    }
  }
}

export default Person;
