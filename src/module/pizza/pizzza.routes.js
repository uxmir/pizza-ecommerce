import express from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import * as PizzaController from './pizza.controller.js'
const router=express.Router()
router.post('/create',authenticate,authorize("admin"),PizzaController.createdPizza)
router.get('/get-all',PizzaController.findAll)
export default router