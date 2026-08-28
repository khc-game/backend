export default class TargetingCalculator {
  constructor(map, playerId, fromI, fromJ, patterns, filters) {
    let availableMoves = [];

    for (let i = 0; i < patterns.length; ++i) {
      availableMoves = [
        ...availableMoves,
        ...patterns[i].calculate(map, fromI, fromJ),
      ];
    }

    if (filters.length > 0) {
      for (let i = 0; i < filters.length; ++i) {
        availableMoves = filters[i].calculate(
          map,
          playerId,
          availableMoves,
          fromI,
          fromJ,
        );
      }
    }

    return availableMoves;
  }
}
