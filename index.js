const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const newsRoutes = require("../Routes/news");
// const eventsRoutes = require("../Routes/events");
// const usersRoutes = require("../Routes/users");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL } = process.env;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Use routes
// app.use("/news", newsRoutes);
// app.use("/events", eventsRoutes);
// app.use("/users", usersRoutes);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
