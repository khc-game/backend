// game
import DefaultCharacter from "../game/characters/DefaultCharacter.js";
import JarCharacter from "../game/characters/JarCharacter.js";

// constants
import { characters, characterKeys } from "../config/characters.js";

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

  if (characterKey === characterKeys.jar) {
    return new JarCharacter({ ...character, playerId });
  }

  return new DefaultCharacter({ ...character, playerId });
}
