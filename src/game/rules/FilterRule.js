export default class FilterRule {
  constructor() {
    this.character = { include: false };
    this.cell = { include: false };
  }

  setCharacter(include = false) {
    this.character = { include };
    return this;
  }

  setSell(include = false) {
    this.cell = { include };
  }
}
