import Router from "express";
const router = Router();
import AuthController from "../module/auth.controller.js";
import { authenticate } from "./auth.middleware.js";
router.post("/register", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", authenticate, AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/refresh-token", AuthController.refreshToken);
router.put("/reset-password/:token", AuthController.resetPassword);
router.get("/very-email/:token", AuthController.verifyEmail);

export default router;
