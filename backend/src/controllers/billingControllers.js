import Stripe from "stripe";
import User from "../models/User.js";

// 🔥 Create Stripe only when needed
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is missing in .env");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
};



// =========================
// CREATE CHECKOUT SESSION
// =========================
export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { priceId } = req.body;

    let user = req.user;

    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      user.stripeCustomerId = customer.id;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: "http://localhost:5173/subscription-success",
      cancel_url: "http://localhost:5173/dashboard",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Checkout Error:", error.message);
    res.status(500).json({ message: "Checkout failed" });
  }
};



// =========================
// BILLING PORTAL
// =========================
export const createBillingPortal = async (req, res) => {
  try {
    const stripe = getStripe();

    const portal = await stripe.billingPortal.sessions.create({
      customer: req.user.stripeCustomerId,
      return_url: "http://localhost:5173/dashboard",
    });

    res.json({ url: portal.url });

  } catch (error) {
    console.error("Billing Portal Error:", error.message);
    res.status(500).json({ message: "Billing portal failed" });
  }
};



// =========================
// CANCEL SUBSCRIPTION
// =========================
export const cancelSubscription = async (req, res) => {
  try {
    const stripe = getStripe();

    await stripe.subscriptions.del(req.user.stripeSubscriptionId);

    req.user.plan = "free";
    req.user.stripeSubscriptionId = null;
    await req.user.save();

    res.json({ message: "Subscription canceled" });

  } catch (error) {
    console.error("Cancel Error:", error.message);
    res.status(500).json({ message: "Cancel failed" });
  }
};



// =========================
// STRIPE WEBHOOK
// =========================
export const stripeWebhook = async (req, res) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed");
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    const user = await User.findOne({
      stripeCustomerId: session.customer,
    });

    if (!user) return res.json({ received: true });

    user.stripeSubscriptionId = subscription.id;

    const priceId = subscription.items.data[0].price.id;

    if (priceId === process.env.STRIPE_PRICE_STARTER)
      user.plan = "starter";

    if (priceId === process.env.STRIPE_PRICE_PRO)
      user.plan = "pro";

    if (priceId === process.env.STRIPE_PRICE_ENTERPRISE)
      user.plan = "enterprise";

    await user.save();
  }

  res.json({ received: true });
};