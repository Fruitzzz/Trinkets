const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const errors = require("../middleware/errors.middleware");
const config = require("config");
const router = express.Router();
const userCheck = require("../middleware/user.middleware");
const fail = { msg: "serverFail" };
router.post(
  "/signUp",
  [
    check("name", "enterName").notEmpty(),
    check("email", "invalidEmail").isEmail(),
    check("password", "passwordLength").isLength({
      min: 5,
    }),
  ],
  errors,
  userCheck,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(email);
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json(userResponse(user));
    } catch (e) {
      res.status(500).json(fail);
    }
  }
);

router.post(
  "/signIn",
  [check("name", "enterName").notEmpty()],
  errors,
  async (req, res) => {
    try {
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
      res.status(201).json(userResponse(user));
    } catch (e) {
      res.status(500).json(fail);
    }
  }
);

router.post("/socialSignIn", userCheck, async (req, res) => {
  try {
    const { name, email, id, twin } = req.body;
    if (twin) {
      return res.status(201).json(userResponse(twin));
    }
    const hashedPassword = await bcrypt.hash(id, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json(userResponse(user));
  } catch (e) {
    res.status(500).json(fail);
  }
});

const userResponse = (user) => {
  const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"));
  return {
    token,
    id: user.id,
    name: user.name,
    isAdmin: user.isAdmin,
  };
};
module.exports = router;
