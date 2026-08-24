export default class IPattern {
  constructor(radius, rule) {
    this.radius = radius;
    this.rule = rule;
  }

  calculate(map, fromI, fromJ) {
    throw new Error("Must be implement");
  }
}
