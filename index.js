const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const newsRoutes = require("./routes/news");
const eventsRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/village", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes
app.use("/news", newsRoutes);
app.use("/events", eventsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
