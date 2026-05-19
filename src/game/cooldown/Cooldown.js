export default class Cooldown {
  cooldowns = null;

  constructor() {
    this.cooldowns = {};
  }

  #createKey(socketId, moduleTitle) {
    return `${socketId}-${moduleTitle}`;
  }

  add(socketId, moduleTitle, cooldown) {
    const key = this.#createKey(socketId, moduleTitle);
    this.cooldowns[key] = cooldown;
  }

  has(socketId, moduleTitle) {
    const key = this.#createKey(socketId, moduleTitle);
    return key in this.cooldowns;
  }

  countDownForCurrentPlayer(socketId) {
    for (const key in this.cooldowns) {
      if (!key.startsWith(socketId)) continue;
      
      if (--this.cooldowns[key] === 0) {
        delete this.cooldowns[key];
      }
    }
  }
}