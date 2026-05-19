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

  vampire: {
    name: "Vampire",
    hp: 50,
    modules: [
      ["MoveModule", 4],
      ["VampirismModule", 20, 1],
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