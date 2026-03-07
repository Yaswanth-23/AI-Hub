import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET current logged in user
router.get("/me", protect, async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    plan: req.user.plan,
    usage: req.user.usage,
    revenue: req.user.revenue,
    settings: req.user.settings
  });
});


// ✅ GET USER SETTINGS
router.get("/settings", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.settings || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});


// ✅ UPDATE USER SETTINGS
router.put("/settings", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.settings = {
      ...user.settings,
      ...req.body
    };

    await user.save();

    res.json(user.settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings" });
  }
});

export default router;