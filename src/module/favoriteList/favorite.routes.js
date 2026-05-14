import express from "express";
const router = express.Router();
import { authenticate, authorize } from "../auth/auth.middleware.js";
import * as FavoriteController from "./favorite.controller.js";
router.post(
  "/create",
  authenticate,
  authorize("user"),
  FavoriteController.favorite,
);
router.get(
  "/data-all",
  authenticate,
  authorize("user"),
  FavoriteController.findAll,
);
router.get("/data-id/:id", FavoriteController.findById);
export default router;
