import axios from "axios";

const API = "http://localhost:5000/api/auth";

/* =========================
   🔐 REGISTER
========================= */
export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

/* =========================
   🔐 LOGIN
========================= */
export const loginUser = async (data) => {
  const res = await axios.post(`${API}/login`, data);

  // Save token locally (important for protected routes later)
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

/* =========================
   👤 UPDATE PROFILE
========================= */
export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API}/update-profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =========================
   🔑 CHANGE PASSWORD
========================= */
export const changePassword = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API}/change-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};