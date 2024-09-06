import express from "express";
import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router
  .route("/payments/checkout_stripe")
  .post(isAuthenticatedUser, stripeCheckoutSession);
router.route("/payment/webhook").post(stripeWebhook);

export default router;
