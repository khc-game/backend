export default class Module {
  title = null;

  constructor(title) {
    this.title = title;
  }

  whereCanUse(map, from) {
    throw new Error("Must be implemented");
  }

  use(map, from, to) {
    throw new Error("Must be implemented");
  }
}
