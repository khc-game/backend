export default class PatternRule {
  constructor() {
    this.character = { include: false, stop: true };
  }

  setCharacter(include = false, stop = true) {
    this.character = { include, stop };
    return this;
  }
}
