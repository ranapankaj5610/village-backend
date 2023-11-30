const express = require("express");
const router = express.Router();
const News = require("../models/News");

router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const news = new News({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedNews = await news.save();
    res.json(savedNews);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
