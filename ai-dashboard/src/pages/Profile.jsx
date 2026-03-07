import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, login, logout } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const usageLimit = user?.plan === "pro" ? 1000 : 100;
  const usagePercent = (user?.usage / usageLimit) * 100;

  const handleNameUpdate = async () => {
    try {
      const res = await axios.put("/api/user/update-name", {
        userId: user.id,
        name,
      });

      login(res.data.user);
      setMessage("Name updated successfully");
    } catch {
      setMessage("Update failed");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await axios.put("/api/user/change-password", {
        userId: user.id,
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password updated successfully");
    } catch {
      setMessage("Password update failed");
    }
  };

  return (
    <div className="min-h-screen text-white px-10 py-14 max-w-5xl mx-auto">

      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="text-white/40 text-sm mt-2">
          Manage your account settings and security
        </p>
      </div>

      {/* Account Section */}
      <section className="mb-16">
        <h2 className="text-lg font-medium mb-6">Account Information</h2>

        <div className="space-y-6">

          <div>
            <label className="text-sm text-white/50 block mb-2">
              Name
            </label>
            <div className="flex gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-purple-500 transition"
              />
              <button
                onClick={handleNameUpdate}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                Save
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-white/50 block mb-2">
              Email
            </label>
            <input
              value={user?.email}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/50"
            />
          </div>

        </div>
      </section>

      {/* Security Section */}
      <section className="mb-16">
        <h2 className="text-lg font-medium mb-6">Security</h2>

        <div className="space-y-6">

          <div>
            <label className="text-sm text-white/50 block mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-white/50 block mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-purple-500 transition"
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Update Password
          </button>

        </div>
      </section>

      {/* Plan & Usage */}
      <section className="mb-16">
        <h2 className="text-lg font-medium mb-6">Plan & Usage</h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">

          <div className="flex justify-between items-center">
            <span className="text-white/60">Current Plan</span>
            <span className="text-purple-400 font-medium uppercase">
              {user?.plan}
            </span>
          </div>

          <div>
            <div className="flex justify-between text-sm text-white/50 mb-2">
              <span>Usage</span>
              <span>{user?.usage}/{usageLimit}</span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-2 bg-purple-600 transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-lg font-medium text-red-500 mb-6">
          Danger Zone
        </h2>

        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          Logout
        </button>
      </section>

      {message && (
        <p className="mt-10 text-sm text-white/40">{message}</p>
      )}
    </div>
  );
}