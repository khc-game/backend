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
import RadiusPattern from "../game/patterns/RadiusPattern.js";
import KnightPattern from "../game/patterns/KnightPattern.js";
import DiagonalPattern from "../game/patterns/DiagonalPattern.js";
import OrthogonalPattern from "../game/patterns/OrthogonalPattern.js";

// filter
import Filter from "../game/filters/Filter.js";

// rule
import PatternRule from "../game/rules/PatternRule.js";
import FilterRule from "../game/rules/FilterRule.js";

export const characters = {
  chess_king: {
    name: "Kingy",
    hp: 100,
    cost: 5,
    shop: ["Figure's Shop", 0, 1],
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(1, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(5)
        .addPattern(
          new RadiusPattern(1, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, false)),
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
        new OrthogonalPattern(3, new PatternRule().setCharacter(false, true)),
        new DiagonalPattern(5, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(50)
        .addPattern(
          new OrthogonalPattern(7, new PatternRule().setCharacter(true, true)),
          new DiagonalPattern(7, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  chess_rook: {
    name: "Roko",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new OrthogonalPattern(5, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(40)
        .addPattern(
          new OrthogonalPattern(5, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  chess_bishop: {
    name: "Bishpi",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new DiagonalPattern(3, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(30)
        .addPattern(
          new DiagonalPattern(3, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  chess_knight: {
    name: "Knith",
    hp: 100,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new KnightPattern(new PatternRule().setCharacter(false)),
      ),
      new AttackModule(30)
        .addPattern(new KnightPattern(new PatternRule().setCharacter(true)))
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  chess_pawn: {
    name: "Pawon",
    hp: 100,
    cantSelect: true,
    modules: [
      new MovePawnModule().addPattern(
        new RadiusPattern(1, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(5)
        .addPattern(
          new RadiusPattern(1, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  jellish: {
    name: "Jellish",
    hp: 100,
    cost: 1,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(3, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(75)
        .addPattern(
          new RadiusPattern(3, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  rock: {
    name: "Rock",
    hp: 200,
    cost: 5,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(1, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(40)
        .addPattern(
          new RadiusPattern(2, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  },

  vampire: {
    name: "Vampire",
    hp: 100,
    cost: 2,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(4, new PatternRule().setCharacter(false, true)),
      ),
      new VampirismModule(20, 1)
        .addPattern(
          new RadiusPattern(1, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(new Filter(new FilterRule().setCharacter(true, true, true))),
    ],
  },

  bambrik: {
    name: "Bambrik",
    hp: 100,
    cost: 2,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(2, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(10)
        .addPattern(
          new RadiusPattern(3, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
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
        new RadiusPattern(2, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(10)
        .addPattern(
          new RadiusPattern(2, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
      new PotionModule(10, 2)
        .addPattern(
          new RadiusPattern(3, new PatternRule().setCharacter(true, false)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, true, false)),
        ),
    ],
  },

  amoeba: {
    name: "Amoeba",
    hp: 10,
    cost: 1,
    modules: [
      new AttackModule(5)
        .addPattern(
          new RadiusPattern(2, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
      new DivideModule(1).addPattern(
        new RadiusPattern(1, new PatternRule().setCharacter(false, true)),
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
