import express from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import * as PizzaController from './pizza.controller.js'
const router=express.Router()
router.post('/create',authenticate,authorize("admin"),PizzaController.createdPizza)
router.get('/get-all',PizzaController.findAll)
router.get('/single/:id',PizzaController.findById)
router.put('/data/:id',PizzaController.updateById)
router.delete('/delete/:id',PizzaController.deleteById)
export default router