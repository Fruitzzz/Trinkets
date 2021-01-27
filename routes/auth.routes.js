const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
const router = express.Router();
const success = { msg: "success" };
const fail = { msg: "serverFail" };
router.post(
  "/signUp",
  [
    check("name", "enterName").notEmpty(),
    check("email", "invalidEmail").normalizeEmail().isEmail(),
    check("password", "passwordLength").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: errors.array()[0].msg,
        });
      }
      const { name, email, password } = req.body;
      const twin = await User.findOne({ $or: [{ email }, { name }] });
      if (twin) {
        if (twin.email === email) {
          return res.status(400).json({ msg: "emailExist" });
        } else {
          return res.status(400).json({
            msg: "userExist",
          });
        }
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json(success);
    } catch (e) {
      res.status(500).json(fail);
    }
  }
);
router.post("/signIn", [check("name").notEmpty()], async (req, res) => {
  try {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        msg: "enterName",
      });
    }
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ msg: "userNotFound" });
    }
    if (user.isBlocked) {
      return res.status(400).json({ msg: "userBlocked" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalidPassword" });
    }
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"));
    res.json({
      token,
      userId: user.id,
      userName: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (e) {
    res.status(500).json(fail);
  }
});
module.exports = router;
