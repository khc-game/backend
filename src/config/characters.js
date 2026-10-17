// character
import DefaultCharacter from "../game/characters/DefaultCharacter.js";
import JarCharacter from "../game/characters/JarCharacter.js";
import DancleCharacter from "../game/characters/DancleCharacter.js";

// modules
import MoveModule from "../game/module/MoveModule.js";
import MovePawnModule from "../game/module/MovePawnModule.js";
import AttackModule from "../game/module/AttackModule.js";
import VampirismModule from "../game/module/VampirismModule.js";
import TeleportModule from "../game/module/TeleportModule.js";
import PotionModule from "../game/module/PotionModule.js";
import DivideModule from "../game/module/DivideModule.js";
import ShopItemCharacterModule from "../game/module/ShopItemCharacterModule.js";
import SelfExplosionModule from "../game/module/SelfExplosionModule.js";

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

export const charactersValues = [
  new DancleCharacter({
    name: "Dancle",
    key: "dancle",
    cost: 6,
    hp: 100,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(6, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(10)
        .addPattern(
          new RadiusPattern(2, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
    modulesStack: [
      [
        new MoveModule().addPattern(
          new RadiusPattern(4, new PatternRule().setCharacter(false, true)),
        ),
        new AttackModule(20)
          .addPattern(
            new RadiusPattern(2, new PatternRule().setCharacter(true, true)),
          )
          .addFilter(
            new Filter(new FilterRule().setCharacter(true, false, true)),
          ),
      ],
      [
        new MoveModule().addPattern(
          new RadiusPattern(5, new PatternRule().setCharacter(false, true)),
        ),
        new AttackModule(30)
          .addPattern(
            new RadiusPattern(3, new PatternRule().setCharacter(true, true)),
          )
          .addFilter(
            new Filter(new FilterRule().setCharacter(true, false, true)),
          ),
      ],
      [
        new MoveModule().addPattern(
          new RadiusPattern(6, new PatternRule().setCharacter(false, true)),
        ),
        new AttackModule(40)
          .addPattern(
            new RadiusPattern(4, new PatternRule().setCharacter(true, true)),
          )
          .addFilter(
            new Filter(new FilterRule().setCharacter(true, false, true)),
          ),
      ],
    ],
  }),

  new JarCharacter({
    name: "Jar",
    key: "jar",
    hp: 40,
    cost: 4,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(2, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(30)
        .addPattern(
          new RadiusPattern(2, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
    ],
  }),

  new DefaultCharacter({
    name: "Jar Shard",
    key: "jar_shard",
    hp: 20,
    cantSelect: true,
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(4, new PatternRule().setCharacter(false, true)),
      ),
      new SelfExplosionModule(15).addPattern(
        new RadiusPattern(1, new PatternRule().setCharacter(true, false)),
        new DiagonalPattern(1, new PatternRule().setCharacter(true, false)),
      ),
    ],
  }),

  new DefaultCharacter({
    name: "Kingy",
    key: "chess_king",
    hp: 100,
    cost: 5,
    shop: ["Figure's Shop", 0, 1],
    modules: [
      new MoveModule().addPattern(
        new RadiusPattern(1, new PatternRule().setCharacter(false, true)),
      ),
      new AttackModule(500)
        .addPattern(
          new RadiusPattern(7, new PatternRule().setCharacter(true, true)),
        )
        .addFilter(
          new Filter(new FilterRule().setCharacter(true, false, true)),
        ),
      new ShopItemCharacterModule("chess_pawn", 2),
      new ShopItemCharacterModule("chess_knight", 3),
      new ShopItemCharacterModule("chess_bishop", 4),
      new ShopItemCharacterModule("chess_rook", 5),
    ],
  }),

  new DefaultCharacter({
    name: "Queeny",
    key: "chess_queen",
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
  }),

  new DefaultCharacter({
    name: "Roko",
    key: "chess_rook",
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
  }),

  new DefaultCharacter({
    name: "Bishpi",
    key: "chess_bishop",
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
  }),

  new DefaultCharacter({
    name: "Knith",
    key: "chess_knight",
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
  }),

  new DefaultCharacter({
    name: "Pawon",
    key: "chess_pawn",
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
  }),

  new DefaultCharacter({
    name: "Jellish",
    key: "jellish",
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
  }),

  new DefaultCharacter({
    name: "Rock",
    key: "rock",
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
  }),

  new DefaultCharacter({
    name: "Vampire",
    key: "vampire",
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
  }),

  new DefaultCharacter({
    name: "Bambrik",
    key: "bambrik",
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
  }),

  new DefaultCharacter({
    name: "Honlia",
    key: "honlia",
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
  }),

  new DefaultCharacter({
    name: "Amoeba",
    key: "amoeba",
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
  }),
];

export const characters = {};

export const characterKeys = {};

for (let i = 0; i < charactersValues.length; ++i) {
  const character = charactersValues[i];

  const key = character.key;
  characters[key] = character;
  characterKeys[key] = key;
}
