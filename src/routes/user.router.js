// libs
import { Router } from "express";

// controller
import UserController from "../controller/user.controller.js";

// middleware
import Middleware from "../middleware/middleware.js";

const router = Router();

router.get("/my", Middleware.accessToken, UserController.getMyProfile);

export default router;
