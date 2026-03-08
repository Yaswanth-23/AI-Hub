import api from "@api/api";

/* =========================
   🔐 REGISTER
========================= */
export const registerUser = async (data) => {
  const { data: res } = await api.post("/auth/register", data);
  return res;
};

/* =========================
   🔐 LOGIN
========================= */
export const loginUser = async (data) => {
  const { data: res } = await api.post("/auth/login", data);

  if (res.token) {
    localStorage.setItem("token", res.token);
  }

  return res;
};

/* =========================
   👤 UPDATE PROFILE
========================= */
export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const { data: res } = await api.put("/auth/update-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

/* =========================
   🔑 CHANGE PASSWORD
========================= */
export const changePassword = async (data) => {
  const token = localStorage.getItem("token");

  const { data: res } = await api.put("/auth/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};