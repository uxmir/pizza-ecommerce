import express from 'express'

const router=express.Router()
import * as Checkoutcontroller from './checkout.controller.js'
import { authenticate,authorize } from '../auth/auth.middleware.js'

router.post('/checkout',authenticate,authorize("user"),Checkoutcontroller.checkout)
router.post('/checkout/success/:id',Checkoutcontroller.successPayment)
router.post('/checkout/fail',Checkoutcontroller.failPayment)
export default router