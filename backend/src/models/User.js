import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: { type: String, default: "user" },
  plan: { type: String, default: "free" },

  usage: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },

  stripeCustomerId: String,
  stripeSubscriptionId: String,

  // ✅ ADD THIS SETTINGS OBJECT
  settings: {
    theme: { type: String, default: "dark" },
    defaultModel: { type: String, default: "Auto" },
    responseLength: { type: String, default: "Medium" },
    autoRouting: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    usageAlert: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false }
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);