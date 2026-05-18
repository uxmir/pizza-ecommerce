import express from "express";
const router = express.Router();
import * as ReviewController from "./review.controller.js";
import { authenticate, authorize } from "../auth/auth.middleware.js";
router.get("/review-all/:id", ReviewController.findReview);
/* =====protectedRoute======*/
router.use(authenticate, authorize("user"));
router.create("/create", ReviewController.createReview);
router.get("/review-user", ReviewController.findForUser);
router.put("/review-update/:id", ReviewController.updateReview);
router.delete("/delete/:id",ReviewController.deleteById)
router.delete('/delete-all',ReviewController.deleteAll)
export default router;
