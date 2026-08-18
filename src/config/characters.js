// modules
import MoveModule from "../game/module/MoveModule.js";
import AttackModule from "../game/module/AttackModule.js";
import VampirismModule from "../game/module/VampirismModule.js";
import TeleportModule from "../game/module/TeleportModule.js";
import PotionModule from "../game/module/PotionModule.js";
import DivideModule from "../game/module/DivideModule.js";
import ShopItemCharacterModule from "../game/module/ShopItemCharacterModule.js";

// patterns
import PatternRadius from "../game/patterns/PatternRadius.js";

// rule
import Rule from "../game/rule/Rule.js";

export const characters = {
  test: {
    name: "Test",
    hp: 10,
    cost: 1,
    shop: ["Shop", 0, 1],
    modules: [
      new MoveModule().addPattern(
        new PatternRadius(2, new Rule().setCharacter(false, true)),
      ),
      new AttackModule(10).addPattern(
        new PatternRadius(4, new Rule().setCharacter(true, true)),
      ),
      new VampirismModule(5, 1).addPattern(
        new PatternRadius(2, new Rule().setCharacter(true, true)),
      ),
      new TeleportModule(1),
      new PotionModule(10, 1).addPattern(
        new PatternRadius(3, new Rule().setCharacter(true, false)),
      ),
      new DivideModule(1).addPattern(
        new PatternRadius(1, new Rule().setCharacter(false, true)),
      ),
      new ShopItemCharacterModule("test", 1),
    ],
  },

  // chess_king: {
  //   name: "Kingy",
  //   hp: 100,
  //   cost: 5,
  //   shop: ["Figure's Shop", 7, 1],
  //   modules: [
  //     new MoveModule(1),
  //     new AttackModule(50, 1),
  //     new ShopItemCharacterModule("chess_pawn", 1),
  //     new ShopItemCharacterModule("chess_knight", 2),
  //     new ShopItemCharacterModule("chess_bishop", 3),
  //     new ShopItemCharacterModule("chess_rook", 4),
  //   ],
  // },

  // chess_queen: {
  //   name: "Queeny",
  //   hp: 100,
  //   cantSelect: true,
  //   modules: [new MoveModule(), new AttackModule()],
  // },

  // chess_rook: {
  //   name: "Roko",
  //   hp: 100,
  //   cantSelect: true,
  //   modules: [new MoveModule(), new AttackModule()],
  // },

  // chess_bishop: {
  //   name: "Bishpi",
  //   hp: 100,
  //   cantSelect: true,
  //   modules: [new MoveModule(), new AttackModule()],
  // },

  // chess_knight: {
  //   name: "Knith",
  //   hp: 100,
  //   cantSelect: true,
  //   modules: [new MoveModule(1), new AttackModule(5, 1)],
  // },

  // chess_pawn: {
  //   name: "Pawon",
  //   hp: 100,
  //   cantSelect: true,
  //   modules: [new MoveModule(1), new AttackModule(5, 1)],
  // },

  // jellish: {
  //   name: "Jellish",
  //   hp: 100,
  //   cost: 1,
  //   modules: [new MoveModule(3), new AttackModule(75, 3)],
  // },

  // rock: {
  //   name: "Rock",
  //   hp: 200,
  //   cost: 5,
  //   modules: [new MoveModule(1), new AttackModule(40, 2)],
  // },

  // vampire: {
  //   name: "Vampire",
  //   hp: 100,
  //   cost: 2,
  //   modules: [new MoveModule(4), new VampirismModule(20, 1)],
  // },

  // bambrik: {
  //   name: "Bambrik",
  //   hp: 100,
  //   cost: 2,
  //   modules: [
  //     new MoveModule(2),
  //     new AttackModule(10, 3),
  //     new TeleportModule(1),
  //   ],
  // },

  // honlia: {
  //   name: "Honlia",
  //   hp: 100,
  //   cost: 4,
  //   modules: [
  //     new MoveModule(2),
  //     new AttackModule(10, 2),
  //     new PotionModule(10, 3, 2),
  //   ],
  // },

  // amoeba: {
  //   name: "Amoeba",
  //   hp: 10,
  //   cost: 1,
  //   modules: [
  //     new AttackModule(5, 2),
  //     new DivideModule(1),
  //     new BuffModule(5, 2),
  //   ],
  // },
};

export const charactersValues = [];

for (const key in characters) {
  const char = {
    ...characters[key],
    key,
  };

  charactersValues.push(char);
}
