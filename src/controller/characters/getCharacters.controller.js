// constants
import { charactersValues } from "../../config/characters.js";

export default async function getCharacters(req, res) {
  res.status(200).json({ characters: charactersValues });
}
