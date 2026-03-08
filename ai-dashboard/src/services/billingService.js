import api from "../api/api.js";

export const createCheckout = async (priceId) => {
  const { data } = await api.post("/billing/create-checkout", { priceId });
  window.location.href = data.url;
};

export const openBillingPortal = async () => {
  const { data } = await api.post("/billing/create-portal");
  window.location.href = data.url;
};

export const cancelSubscription = async () => {
  await api.post("/billing/cancel");
};