const express = require("express");
const AdminModel = require("./../../models/adminModel");
const bcrypt = require("bcrypt");
const createToken = require("../../utility/createToken");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ msg: "Email does not exist. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = await createToken({ name: user.name, email: user.email }); // <- Correct payload
      return res
        .status(200)
        .json({ msg: "Logged in successfully", authToken: token });
    } else {
      return res.status(200).json({ msg: "Wrong password" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    const newAdminModel = new AdminModel({
      name,
      email,
      password: hashedPassword,
    });

    const result = await newAdminModel.save();

    if (result) {
      return res.status(200).json({ msg: "Data saved successfully" });
    } else {
      return res
        .status(200)
        .json({ msg: "Failed to save data, please try later" });
    }
  } catch (err) {
    console.error("Error saving admin:", err);
    return res.status(500).json({ error: "Internal Server Error occurred" });
  }
});

module.exports = router;
