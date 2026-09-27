// constants
import { charactersValues } from "../config/characters.js";

export default class CharacterController {
  static async getCharacters(req, res) {
    res.status(200).json({ characters: charactersValues });
  }
}
