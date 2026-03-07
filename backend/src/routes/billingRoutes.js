import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCheckoutSession,
  createBillingPortal,
  cancelSubscription,
  stripeWebhook,
} from "../controllers/billingControllers.js";

const router = express.Router();

// ✅ Checkout
router.post("/create-checkout", protect, createCheckoutSession);

// ✅ Billing Portal
router.post("/create-portal", protect, createBillingPortal);

// ✅ Cancel Subscription
router.post("/cancel", protect, cancelSubscription);

// ✅ Stripe Webhook (NO protect)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;