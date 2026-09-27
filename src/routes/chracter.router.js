// libs
import { Router } from "express";

// controllers
import CharacterController from "../controller/character.controller.js";

const router = Router();

router.get("/", CharacterController.getCharacters);

export default router;
