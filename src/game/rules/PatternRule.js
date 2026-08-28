export default class PatternRule {
  constructor() {
    this.character = { include: true, stop: false };
  }

  setCharacter(include = true, stop = false) {
    this.character = { include, stop };
    return this;
  }
}
