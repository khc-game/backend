import IFilter from "./Interface/IFilter.js";

export default class Filter extends IFilter {
  constructor(rule) {
    super(rule);
  }

  calculate(map, positions, fromI, fromJ) {
    const result = [];

    const isCharIncludeRule = this.rule.character.include;
    const isCellIncludeRule = this.rule.cell.include;

    for (let i = 0; i < positions.length; ++i) {
      const position = positions[i];
      const [mI, mJ] = position;

      if (map[mI][mJ].character) {
        if (isCharIncludeRule) {
          result.push(position);
        }
      } else {
        if (isCellIncludeRule) {
          result.push(position);
        }
      }
    }

    return result;
  }
}
