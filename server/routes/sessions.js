const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Session = require("../models/Session");

// GET: User’s sessions
router.get("/my-sessions", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user }).sort({ updated_at: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// GET: Public sessions (for dashboard)
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).sort({ created_at: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// POST: Save or update draft
router.post("/my-sessions/save-draft", auth, async (req, res) => {
  const { title, tags, json_file_url } = req.body;
  try {
    const existing = await Session.findOne({ user_id: req.user, title });
    if (existing) {
      existing.tags = tags;
      existing.json_file_url = json_file_url;
      existing.updated_at = new Date();
      await existing.save();
      return res.json({ message: "Draft updated" });
    }

    const session = new Session({
      user_id: req.user,
      title,
      tags,
      json_file_url,
      status: "draft",
    });
    await session.save();
    res.status(201).json({ message: "Draft saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


//publish
router.post("/my-sessions/publish", auth, async (req, res) => {
  const { title, tags, json_file_url } = req.body;
  try {
    const existing = await Session.findOne({ user_id: req.user, title });

    if (existing) {
      existing.tags = tags;
      existing.json_file_url = json_file_url;
      existing.status = "published";
      existing.updated_at = new Date();
      await existing.save();
      return res.json({ message: "Session published" });
    }

    const session = new Session({
      user_id: req.user,
      title,
      tags,
      json_file_url,
      status: "published",
    });
    await session.save();
    res.status(201).json({ message: "Session created and published" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
