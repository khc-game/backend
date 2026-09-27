// libs
import { Router } from "express";

// controller
import AuthController from "../controller/auth.controller.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// router.post("/change-password", AuthController.changePassword);
// router.post("/forgot-password", AuthController.forgotPassword);
// router.post("/reset-password", AuthController.resetPassword);

export default router;
