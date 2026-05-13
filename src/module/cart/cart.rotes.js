import express from "express";
const router = express.Router();
import { authenticate, authorize } from "../auth/auth.middleware.js";
import * as CartController from "./cart.controller.js";
router.post(
  "/create/:id",
  authenticate,
  authorize("user"),
  CartController.createCart,
);
router.post(
  "/increase-cart/:id",
  authenticate,
  authorize("user"),
  CartController.increaseCart,
);
router.post(
  "/descrease-cart/:id",
  authenticate,
  authorize("user"),
  CartController.descreaseCart
)
router.get(
  "/get-all",
  authenticate,
  authorize("user"),
  CartController.findAllCart,
);
router.delete(
  "/delete",
  authenticate,
  authorize("user"),
  CartController.deleteCart,
);

export default router;
