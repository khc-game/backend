export default class Cooldown {
  cooldowns = null;

  constructor() {
    this.cooldowns = {};
  }

  add(moduleId, cooldown) {
    this.cooldowns[moduleId] = cooldown;
  }

  has(moduleId) {
    return moduleId in this.cooldowns;
  }

  countDownForCurrentPlayer(moduleId) {
    for (const id in this.cooldowns) {
      if (id === moduleId) continue;

      if (--this.cooldowns[id] < 0) {
        delete this.cooldowns[id];
      }
    }
  }
}
