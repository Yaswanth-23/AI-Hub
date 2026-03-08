import api from "@api/api";

/* =========================
   ⭐ CREATE CHECKOUT SESSION
========================= */
export const createCheckout = async (priceId) => {
  try {
    const { data } = await api.post("/billing/create-checkout", {
      priceId,
    });

    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error("Checkout Error:", error);
  }
};

/* =========================
   ⭐ OPEN BILLING PORTAL
========================= */
export const openBillingPortal = async () => {
  try {
    const { data } = await api.post("/billing/create-portal");

    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error("Billing Portal Error:", error);
  }
};

/* =========================
   ⭐ CANCEL SUBSCRIPTION
========================= */
export const cancelSubscription = async () => {
  try {
    await api.post("/billing/cancel");
  } catch (error) {
    console.error("Cancel Subscription Error:", error);
  }
};