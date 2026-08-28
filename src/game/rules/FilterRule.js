export default class FilterRule {
  constructor() {
    this.character = { include: false, teammate: false, enemy: false };
    this.cell = { include: false };
  }

  setCharacter(include = false, teammate = false, enemy = false) {
    this.character = { include, teammate, enemy };
    return this;
  }

  setSell(include = false) {
    this.cell = { include };
  }
}
