import express from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import {upload} from '../../common/middleware/multer.middleware.js'
import * as PizzaController from "./pizza.controller.js";
const router = express.Router();
router.post(
  "/create",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  PizzaController.createdPizza,
);
router.get("/get-all", PizzaController.findAll);
router.get("/single/:id", PizzaController.findById);
router.put(
  "/data/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  PizzaController.updateById,
);
router.delete(
  "/delete/:id",
  authenticate,
  authorize("admin"),
  PizzaController.deleteById,
);
export default router;
