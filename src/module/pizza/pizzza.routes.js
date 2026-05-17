import express from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { upload } from "../../common/middleware/multer.middleware.js";
import * as PizzaController from "./pizza.controller.js";
const router = express.Router();
/*======access for all ========*/
router.get("/get-all", PizzaController.findAll);
router.get("/single/:id", PizzaController.findById);
/*======access for admin ========*/
router.use(authenticate, authorize("admin"));
router.post("/create", upload.single("image"), PizzaController.createdPizza);
router.put("/data/:id", upload.single("image"), PizzaController.updateById);
router.delete("/delete/:id", PizzaController.deleteById);
export default router;
