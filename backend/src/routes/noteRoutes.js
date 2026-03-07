import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

let notes = [];

router.post("/", protect, (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: Date.now(),
    userId: req.user._id.toString(),
    title,
    content
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

router.get("/", protect, (req, res) => {
  const userNotes = notes.filter(
    note => note.userId === req.user._id.toString()
  );

  res.json(userNotes);
});

router.delete("/:id", protect, (req, res) => {
  notes = notes.filter(
    note =>
      note.id !== parseInt(req.params.id) ||
      note.userId !== req.user._id.toString()
  );

  res.json({ message: "Note deleted" });
});

export default router;