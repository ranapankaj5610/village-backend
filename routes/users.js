const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../Models/UserModel");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("No Users are in the list");
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send("No User are in the list by this id");
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/profilePicture", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    //console.log(user);

    if (!user || !user.profilePicture) {
      return res
        .status(404)
        .json({ message: "User or profile picture not found" });
    }

    res.set("Content-Type", user.profilePicture.contentType);
    res.send(user.profilePicture.data);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const profilePicture = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    // const resume = {
    //   data: req.files["resume"][0].buffer,
    //   contentType: req.files["resume"][0].mimetype,
    // };
    const newUser = new User({
      name,
      email,
      description,
      profilePicture,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error("User registration failed:", error);
    res.status(500).json({ error: "User registration failed" });
  }
});

router.put("/:id", upload.single("profilePicture"), async (req, res) => {
  try {
    const { name, email, description } = req.body;
    // const profilePicture = {
    //   data: req.file.buffer,
    //   contentType: req.file.mimetype,
    // };
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        description,
      },
      { new: true }
    );
    if (!user)
      return res.status(404).send("The User with given id was not found.");
    res.send(user);
  } catch (error) {
    console.error("User updation failed:", error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).send("The User with given id was not found.");
    res.send(user);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
