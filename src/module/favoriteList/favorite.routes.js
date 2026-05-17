import express from "express";
const router = express.Router();
import { authenticate, authorize } from "../auth/auth.middleware.js";
import * as FavoriteController from "./favorite.controller.js";

router.use(authenticate, authorize("user"));
router.post("/create", FavoriteController.favorite);
router.get("/data-all", FavoriteController.findAll);
router.get("/data-id/:id", FavoriteController.findById);
router.delete("/delete/:id", FavoriteController.removeById);
router.delete("/delete/all", FavoriteController.removeAll);
export default router;
