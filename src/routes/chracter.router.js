// libs
import { Router } from "express";

// controllers
import getCharactersController from '../controller/characters/getCharacters.controller.js';

const router = Router();

router.get("/", getCharactersController);

export default router;