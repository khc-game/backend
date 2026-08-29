import IFilter from "./Interface/IFilter.js";

export default class Filter extends IFilter {
  constructor(rule) {
    super(rule);
  }

  calculate(map, playerId, positions, fromI, fromJ) {
    const result = [];

    const isCharIncludeRule = this.rule.character.include;
    const isCharTeammateRule = this.rule.character.teammate;
    const isCharEnemyRule = this.rule.character.enemy;
    const isCellIncludeRule = this.rule.cell.include;

    for (let i = 0; i < positions.length; ++i) {
      const position = positions[i];
      const [mI, mJ] = position;

      const character = map[mI][mJ].character;
      if (character) {
        if (isCharIncludeRule) {
          const isCharTeammate = character.playerId === playerId;

          if (
            (isCharTeammateRule && isCharTeammate) ||
            (isCharEnemyRule && !isCharTeammate)
          ) {
            result.push(position);
          }
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
