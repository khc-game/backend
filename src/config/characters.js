/*
  Person: playerId, name, hp, _maxHp, modules
*/

// game
import MoveModule from "../game/module/MoveModule.js";
import AttackModule from "../game/module/AttackModule.js";
import VampirismModule from "../game/module/VampirismModule.js";
import TeleportModule from "../game/module/TeleportModule.js";
import PotionModule from "../game/module/PotionModule.js";

export const characters = {
  jellyfish: {
    name: "Jellyfish",
    hp: 80,
    modules: [
      new MoveModule(2),
      new AttackModule(75, 3),
    ],
  },

  rock: {
    name: "Rock",
    hp: 110,
    modules: [
      new AttackModule(1, 1),
    ],
  },

  vampire: {
    name: "Vampire",
    hp: 50,
    modules: [
      new MoveModule(4),
      new VampirismModule(20, 1),
    ],
  },

  bambrik: {
    name: "Bambrik",
    hp: 50,
    modules: [
      new MoveModule(1),
      new TeleportModule(1),
    ],
  },

  honlia: {
    name: "Honlia",
    hp: 100,
    modules: [
      new MoveModule(2),
      new AttackModule(10, 2),
      new PotionModule(10, 3, 2),
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