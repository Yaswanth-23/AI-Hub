import api from "../api/api.js";

/* =========================
   🔐 REGISTER
========================= */
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

/* =========================
   🔐 LOGIN
========================= */
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/* =========================
   👤 UPDATE PROFILE
========================= */
export const updateProfile = async (data) => {
  const res = await api.put("/auth/update-profile", data);
  return res.data;
};

/* =========================
   🔑 CHANGE PASSWORD
========================= */
export const changePassword = async (data) => {
  const res = await api.put("/auth/change-password", data);
  return res.data;
};