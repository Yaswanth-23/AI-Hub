import api from "./api";

export const getUserSettings = async () => {
  const response = await api.get("/user/settings");
  return response.data;
};

export const updateUserSettings = async (settings) => {
  const response = await api.put("/user/settings", settings);
  return response.data;
};