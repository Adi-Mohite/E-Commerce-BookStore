
import express from "express";
import Feedback from "../model/feedback.model.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const feedback = new Feedback({
      name: name?.trim() || "Anonymous",
      email: email || "",
      message,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit feedback." });
  }
});


router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedbacks." });
  }
});

export default router;
