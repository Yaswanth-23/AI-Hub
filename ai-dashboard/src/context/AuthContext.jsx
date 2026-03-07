import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);

      // ✅ Ensure plan always exists (SaaS safety)
      if (!parsedUser.plan) {
        parsedUser.plan = "free";
      }

      setUser(parsedUser);
    }

    setLoading(false);
  }, []);

  const login = async (formData) => {
    const data = await loginUser(formData);

    // ✅ Ensure backend returns plan
    const safeUser = {
      ...data.user,
      plan: data.user.plan || "free",
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(safeUser));

    setUser(safeUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Optional: Update user after plan change (for billing page later)
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        updateUser, // 🔥 useful for billing upgrades
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);