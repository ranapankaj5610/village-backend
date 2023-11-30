const express = require("express");
const router = express.Router();
const Event = require("../models/Events");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, date } = req.body;
  const event = new Event({ title, description, date });

  try {
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
