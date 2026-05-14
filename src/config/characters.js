/*
  Person: playerId, name, hp, _maxHp, modules
  MoveModule: radius
  AttackModule: attack, radius
  VampirismModule: blood, radius
  TeleportModule: cooldown
  PotionModule: heal, cooldown, radius
*/

export const characters = {
  jellyfish: {
    name: "Jellyfish",
    hp: 80,
    modules: [
      ["MoveModule", 2],
      ["AttackModule", 75, 3]
    ],
  },

  rock: {
    name: "Rock",
    hp: 110,
    modules: [
      ["AttackModule", 1, 1]
    ],
  },

  man: {
    name: "Man",
    hp: 100,
    modules: [
      ["MoveModule", 3],
      ["AttackModule", 25, 5],
    ],
  },

  monequin: {
    name: "Monequin",
    hp: Infinity,
    modules: [
      ["MoveModule", 2],
      ["AttackModule", 50, 6],
      ["TeleportModule", 3],
      ["PotionModule", 20, 3, 2],
      ["VampirismModule", 10, 1],
    ],
  },
};

export const charactersValues = [];

for (const key in characters) {
  const char = {
    ...characters[key],
    key,
  };

  charactersValues.push(char);
}