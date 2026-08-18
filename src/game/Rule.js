export default class Rule {
  constructor() {
    this.character = { include: true, stop: false };
  }

  setCharacter(include, stop) {
    this.character = { include, stop };
    return this;
  }
}
