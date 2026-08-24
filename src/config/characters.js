// modules
import MoveModule from "../game/module/MoveModule.js";
import MovePawnModule from "../game/module/MovePawnModule.js";
import AttackModule from "../game/module/AttackModule.js";
import VampirismModule from "../game/module/VampirismModule.js";
import TeleportModule from "../game/module/TeleportModule.js";
import PotionModule from "../game/module/PotionModule.js";
import DivideModule from "../game/module/DivideModule.js";
import ShopItemCharacterModule from "../game/module/ShopItemCharacterModule.js";

// patterns
import PatternRadiusPattern from "../game/patterns/PatternRadiusPattern.js";
import KnightPattern from "../game/patterns/KnightPattern.js";
import DiagonalPattern from "../game/patterns/DiagonalPattern.js";

// rule
import Rule from "../game/Rule.js";

export const characters = {
  chess_king: {
    name: "Kingy",
    hp: 100,
    cost: 5,
    shop: ["Figure's Shop", 100, 1],
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(5).addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(true, true)),
      ),
      new ShopItemCharacterModule("chess_pawn", 1),
      new ShopItemCharacterModule("chess_knight", 2),
      new ShopItemCharacterModule("chess_bishop", 3),
      new ShopItemCharacterModule("chess_rook", 4),
    ],
  },

  chess_queen: {
    name: "Queeny",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(5).addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  chess_rook: {
    name: "Roko",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(5).addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  chess_bishop: {
    name: "Bishpi",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new DiagonalPattern(1, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(5).addPattern(
        new DiagonalPattern(30, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  chess_knight: {
    name: "Knith",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new KnightPattern(new Rule().setCharacter(false)),
      ),
      new AttackModule(30).addPattern(
        new KnightPattern(new Rule().setCharacter(true)),
      ),
    ],
  },

  chess_pawn: {
    name: "Pawon",
    hp: 100,
    cantSelect: true,
    modules: [
      new MovePawnModule().addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(5).addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  jellish: {
    name: "Jellish",
    hp: 100,
    cost: 1,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(3, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(75).addPattern(
        new PatternRadiusPattern(3, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  rock: {
    name: "Rock",
    hp: 200,
    cost: 5,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(40).addPattern(
        new PatternRadiusPattern(2, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  vampire: {
    name: "Vampire",
    hp: 100,
    cost: 2,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(4, new Rule().setCharacter(false, true)),
      ),
      new VampirismModule(20, 1).addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(true, true)),
      ),
    ],
  },

  bambrik: {
    name: "Bambrik",
    hp: 100,
    cost: 2,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(2, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(10).addPattern(
        new PatternRadiusPattern(3, new Rule().setCharacter(true, true)),
      ),
      new TeleportModule(1),
    ],
  },

  honlia: {
    name: "Honlia",
    hp: 100,
    cost: 4,
    modules: [
      new MoveModule().addPattern(
        new PatternRadiusPattern(2, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(10).addPattern(
        new PatternRadiusPattern(2, new Rule().setCharacter(true, true)),
      ),
      new PotionModule(10, 2).addPattern(
        new PatternRadiusPattern(3, new Rule().setCharacter(true, false)),
      ),
    ],
  },

  amoeba: {
    name: "Amoeba",
    hp: 10,
    cost: 1,
    modules: [
      new AttackModule(5).addPattern(
        new PatternRadiusPattern(2, new Rule().setCharacter(true, true)),
      ),
      new DivideModule(1).addPattern(
        new PatternRadiusPattern(1, new Rule().setCharacter(false, true)),
      ),
    ],
  },
};

export const charactersValues = [];

export const characterKeys = {};

for (const key in characters) {
  const char = {
    ...characters[key],
    key,
  };

  characterKeys[key] = key;

  charactersValues.push(char);
}
