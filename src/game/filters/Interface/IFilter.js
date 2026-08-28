export default class IFilter {
  constructor(rule) {
    this.rule = rule;
  }

  calculate(map, playerId, positions, fromI, fromJ) {
    throw new Error("Must be implement");
  }
}
