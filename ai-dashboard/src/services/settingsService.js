import api from "@api/api";

/* =========================
   ⚙️ GET USER SETTINGS
========================= */
export const getUserSettings = async () => {
  const { data } = await api.get("/user/settings");
  return data;
};

/* =========================
   ⚙️ UPDATE USER SETTINGS
========================= */
export const updateUserSettings = async (settings) => {
  const { data } = await api.put("/user/settings", settings);
  return data;
};