// game
import DefaultCharacter from "../game/characters/DefaultCharacter.js";

// constants
import { characters } from "../config/characters.js";

export default function buildCharacterByKey(characterKey, playerId = null) {
  const character = characters[characterKey];

  if (!character) {
    return new DefaultCharacter({
      name: "Test",
      hp: 1,
      key: "test",
      modules: [],
      cost: 9999,
      playerId,
    });
  }

  return new DefaultCharacter({ ...character, playerId });
}
