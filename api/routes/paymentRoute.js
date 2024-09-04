import express from "express";
import { stripeCheckoutSession } from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router
  .route("/payments/checkout_stripe")
  .post(isAuthenticatedUser, stripeCheckoutSession);

export default router;
