import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserSettings, updateUserSettings } from "../services/settingsService";

export default function Settings() {
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    defaultModel: "Auto",
    responseLength: "Medium",
    emailNotifications: true,
    usageAlert: true,
    marketingEmails: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isFreePlan = user?.plan === "free";

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getUserSettings();
        if (data) setSettings((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateUserSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-10 py-14 max-w-5xl mx-auto">

      {/* Page Header */}
      <div className="mb-14">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-white/40 text-sm mt-2">
          Manage your AI configuration and notifications
        </p>
      </div>

      {/* PLAN SECTION */}
      <section className="mb-16">
        <h2 className="text-lg font-medium mb-6">Plan</h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-white/50 text-sm">Current Plan</p>
            <p className="text-purple-400 font-medium uppercase mt-1">
              {user?.plan}
            </p>
          </div>

          {isFreePlan && (
            <button className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
              Upgrade
            </button>
          )}
        </div>
      </section>

      {/* AI PREFERENCES */}
      <section className="mb-16">
        <h2 className="text-lg font-medium mb-6">AI Preferences</h2>

        <div className="space-y-8">

          <div>
            <label className="text-sm text-white/50 block mb-2">
              Default Model
            </label>
            <select
              value={settings.defaultModel}
              onChange={(e) =>
                handleChange("defaultModel", e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
            >
              <option>Auto</option>
              <option disabled={isFreePlan}>GPT-4</option>
              <option disabled={isFreePlan}>Claude</option>
              <option>Gemini</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white/50 block mb-2">
              Response Length
            </label>
            <select
              value={settings.responseLength}
              onChange={(e) =>
                handleChange("responseLength", e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
            >
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </div>

        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="mb-16">
        <h2 className="text-lg font-medium mb-6">Notifications</h2>

        <div className="space-y-6">

          {[
            { key: "emailNotifications", label: "Email Notifications" },
            { key: "usageAlert", label: "Usage Alerts (80%)" },
            { key: "marketingEmails", label: "Marketing Emails" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <span className="text-white/70 text-sm">
                {item.label}
              </span>
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() =>
                  handleChange(item.key, !settings[item.key])
                }
                className="w-4 h-4 accent-purple-500"
              />
            </div>
          ))}

        </div>
      </section>

      {/* SAVE BUTTON */}
      <div className="mb-16">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      {/* DANGER ZONE */}
      <section>
        <h2 className="text-lg font-medium text-red-500 mb-6">
          Danger Zone
        </h2>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
            Delete Account
          </button>
        </div>
      </section>

    </div>
  );
}