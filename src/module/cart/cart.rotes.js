import express from "express";
const router = express.Router();
import { authenticate, authorize } from "../auth/auth.middleware.js";
import * as CartController from "./cart.controller.js";
/*====acess for user======*/
router.use(authenticate, authorize("user"));
router.post("/create/:id", CartController.createCart);
router.post("/increase-cart/:id", CartController.increaseCart);
router.post("/descrease-cart/:id", CartController.descreaseCart);
router.get("/get-all", CartController.findAllCart);
router.delete("/delete/:id", CartController.deleteCart);

export default router;
